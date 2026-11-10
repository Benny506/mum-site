import { describe, it, expect, vi } from "vitest";
import handler, { isCrawler, injectOg } from "../../../netlify/edge-functions/og-injector.js";

describe("og-injector crawler gate", () => {
  it("detects WhatsApp and social crawlers", () => {
    expect(isCrawler("WhatsApp/2.24")).toBe(true);
    expect(isCrawler("facebookexternalhit/1.1")).toBe(true);
    expect(isCrawler("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)")).toBe(false);
  });

  it("passes human traffic through untouched", async () => {
    const passthrough = new Response("shell");
    const context = { next: vi.fn().mockResolvedValue(passthrough) };
    const req = new Request("https://my-uni-map.com/single-location/abc", {
      headers: { "user-agent": "Mozilla/5.0" },
    });
    const res = await handler(req, context);
    expect(res).toBe(passthrough);
  });

  it("injects brand fallback with 200 on entity miss", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    const context = {
      next: vi.fn().mockResolvedValue(new Response("<html><head></head><body></body></html>")),
    };
    const req = new Request("https://my-uni-map.com/single-location/missing", {
      headers: { "user-agent": "WhatsApp/2.24" },
    });
    const res = await handler(req, context);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("og:title");
    expect(html).toContain("UNIMAP");
    expect(res.headers.get("cache-control")).toContain("max-age=3600");
  });

  it("injects announcement tags with banner image on hit", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { id: "a1", title: "Fee Update", body: "Shuttle fees changed", images: [{ url: "https://x/y.jpg", kind: "image" }] },
      ],
    });
    const context = {
      next: vi.fn().mockResolvedValue(new Response("<html><head></head><body></body></html>")),
    };
    const req = new Request("https://my-uni-map.com/announcement/a1", {
      headers: { "user-agent": "Slackbot/1.0" },
    });
    const res = await handler(req, context);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/rest/v1/announcements"), expect.anything());
    const html = await res.text();
    expect(html).toContain("Fee Update on UniMap");
    expect(html).toContain("https://x/y.jpg");
  });

  it("falls back to brand image when announcement has no photo", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: "a2", title: "Notice", body: "Hello", images: [] }],
    });
    const context = {
      next: vi.fn().mockResolvedValue(new Response("<html><head></head><body></body></html>")),
    };
    const req = new Request("https://my-uni-map.com/announcement/a2", {
      headers: { "user-agent": "WhatsApp/2.24" },
    });
    const res = await handler(req, context);
    const html = await res.text();
    expect(html).toContain("og-brand.png");
  });

  it("injects entity tags on hit", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { id: "abc", title: "Senate Building", description: "Main hall", location_images: ["cover.jpg"] },
      ],
    });
    const context = {
      next: vi.fn().mockResolvedValue(new Response("<html><head></head><body></body></html>")),
    };
    const req = new Request("https://my-uni-map.com/single-location/abc", {
      headers: { "user-agent": "Twitterbot/1.0" },
    });
    const res = await handler(req, context);
    const html = await res.text();
    expect(html).toContain("Senate Building on UniMap");
  });

  it("falls back to brand tags on fetch timeout", async () => {
    global.fetch = vi.fn().mockImplementation(() => new Promise(() => {}));
    const context = {
      next: vi.fn().mockResolvedValue(new Response("<html><head></head><body></body></html>")),
    };
    const req = new Request("https://my-uni-map.com/business-profile/o1", {
      headers: { "user-agent": "Slackbot/1.0" },
    });
    const res = await handler(req, context);
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("UNIMAP");
  });

  it("injectOg escapes HTML and sets canonical", () => {
    const out = injectOg("<html><head></head></html>", "https://my-uni-map.com/single-location/1", {
      title: 'A "quoted" <place>',
      description: "d",
      image: "https://x/y.png",
    });
    expect(out).toContain("&quot;quoted&quot;");
    expect(out).toContain('rel="canonical"');
  });

  it("replaces static brand tags instead of duplicating", () => {
    const shell =
      '<html><head><meta property="og:title" content="UNIMAP brand" />' +
      '<meta property="og:description" content="brand desc" />' +
      '<meta property="og:image" content="https://my-uni-map.com/og-brand.png" />' +
      '<meta property="og:site_name" content="MyUniMap" />' +
      '<meta name="twitter:card" content="summary_large_image" />' +
      '<title>UNIMAP</title></head><body></body></html>';
    const out = injectOg(shell, "https://my-uni-map.com/subscription", {
      title: "MyUniMap Premium",
      description: "Desc",
      image: "https://x/img.png",
    });
    expect(out.match(/og:title/g)).toHaveLength(1);
    expect(out).toContain("MyUniMap Premium");
    expect(out).not.toContain("UNIMAP brand");
    expect(out).toContain("og:site_name");
  });
});
