// Netlify Edge Function: crawler OG injector for deep links.
// Human traffic passes through byte-identical. Crawlers (WhatsApp, social
// unfurlers) get per-entity og:title/description/image without running SPA JS.
// Always returns HTTP 200 with the SPA shell; brand tags on miss/error/timeout.

const SUPABASE_URL = "https://tiwuhxljzjknkvplrxrg.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpd3VoeGxqemprbmt2cGxyeHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzOTQ3MTksImV4cCI6MjA4Mzk3MDcxOX0.HrNFt9TEvtwQZs1kVtTX4iyfV9rFKS2s-EtRJgfnSEE";

const BRAND = {
  title: "UNIMAP — Find your way on campus",
  description:
    "UNIMAP helps you find your way on campus. Get directions to buildings, lecture halls, and student businesses.",
  image: "https://my-uni-map.com/og-brand.png",
};

const CRAWLER_RE = /whatsapp|facebookexternalhit|twitterbot|linkedinbot|slackbot|telegrambot|discordbot|opengraph|baiduspider/i;

export const isCrawler = (ua) => CRAWLER_RE.test(ua || "");

export const escapeHtml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const publicImage = (path, bucket) => {
  if (!path || !bucket) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${String(path).replace(/^\/+/, "")}`;
};

async function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("og-fetch-timeout")), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

async function resolveEntity(pathname) {
  const loc = pathname.match(/^\/single-location\/([^/?#]+)/);
  if (loc) {
    const { data } = await withTimeout(
      fetch(
        `${SUPABASE_URL}/rest/v1/locations?id=eq.${encodeURIComponent(loc[1])}&select=id,title,description,location_images`,
        { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
      ).then((r) => (r.ok ? r.json().then((rows) => ({ data: rows[0] })) : { data: null })),
      2500
    );
    if (!data) return null;
    const img = Array.isArray(data.location_images) ? data.location_images[0] : null;
    return {
      title: `${data.title} on UniMap`,
      description: data.description || BRAND.description,
      image: publicImage(img, "location-images") || BRAND.image,
    };
  }

  const biz = pathname.match(/^\/business-profile\/([^/?#]+)/);
  if (biz) {
    const { data } = await withTimeout(
      fetch(
        `${SUPABASE_URL}/rest/v1/business_profiles?owner_id=eq.${encodeURIComponent(biz[1])}&select=id,name,description,cover_image_url,logo_url,is_active`,
        { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
      ).then((r) => (r.ok ? r.json().then((rows) => ({ data: rows[0] })) : { data: null })),
      2500
    );
    if (!data || data.is_active === false) return null;
    return {
      title: `${data.name} on UniMap`,
      description: data.description || BRAND.description,
      image: publicImage(data.cover_image_url || data.logo_url, "business_assets") || BRAND.image,
    };
  }

  if (pathname === "/signup" || pathname.startsWith("/signup")) return { ...BRAND };

  const ann = pathname.match(/^\/announcement\/([^/?#]+)/);
  if (ann) {
    const { data } = await withTimeout(
      fetch(
        `${SUPABASE_URL}/rest/v1/announcements?id=eq.${encodeURIComponent(ann[1])}&select=id,title,body,images`,
        { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
      ).then((r) => (r.ok ? r.json().then((rows) => ({ data: rows[0] })) : { data: null })),
      2500
    );
    if (!data) return null;
    const imgs = Array.isArray(data.images) ? data.images : [];
    const banner = imgs
      .map((a) => (typeof a === "string" ? { url: a, kind: "image" } : a))
      .find((a) => a?.url && (a.kind || "image") === "image");
    const bannerUrl = banner?.url && /^https?:\/\//i.test(banner.url) ? banner.url : null;
    return {
      title: `${data.title || "Campus announcement"} on UniMap`,
      description: (data.body || BRAND.description).slice(0, 200),
      image: bannerUrl || BRAND.image,
    };
  }
  return null;
}

export function injectOg(html, canonical, tags) {
  const og = [
    `<meta property="og:title" content="${escapeHtml(tags.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(tags.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(tags.image)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
  ].join("\n    ");
  if (/<\/head>/i.test(html)) return html.replace(/<\/head>/i, `    ${og}\n  </head>`);
  return `${og}\n${html}`;
}

export default async function handler(request, context) {
  const url = new URL(request.url);
  const ua = request.headers.get("user-agent") || "";

  // Human traffic: byte-identical passthrough.
  if (!isCrawler(ua)) return context.next();

  const response = await context.next();
  try {
    const canonical = `https://my-uni-map.com${url.pathname}${url.search}`;
    let tags = { ...BRAND };
    try {
      tags = (await resolveEntity(url.pathname)) || { ...BRAND };
    } catch {
      tags = { ...BRAND };
    }
    const html = await response.text();
    return new Response(injectOg(html, canonical, tags), {
      status: 200,
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "public, max-age=3600",
      },
    });
  } catch {
    return response;
  }
}

export const config = {
  path: ["/single-location/*", "/business-profile/*", "/announcement/*", "/signup"],
};
