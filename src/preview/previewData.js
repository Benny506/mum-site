import supabase, { SUPABASE_URL } from "./supabaseClient";

export const publicImageUrl = (path, bucket) => {
  if (!path || !bucket) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const clean = String(path).replace(/^\/+/, "");
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${clean}`;
};

export const locationCoverUrl = (location) => {
  const imgs = location?.location_images;
  const first = Array.isArray(imgs) && imgs.length > 0 ? imgs[0] : null;
  return publicImageUrl(first, "location-images");
};

export const businessCoverUrl = (profile) =>
  publicImageUrl(profile?.cover_image_url, "business_assets");

export const businessLogoUrl = (profile) =>
  publicImageUrl(profile?.logo_url, "business_assets");

export const announcementBannerUrl = (announcement) => {
  const imgs = announcement?.images;
  if (!Array.isArray(imgs)) return null;
  const first = imgs
    .map((a) => (typeof a === "string" ? { url: a, kind: "image" } : a))
    .find((a) => a?.url && (a.kind || "image") === "image");
  return first?.url || null;
};

const ANNOUNCEMENT_FIELDS =
  "id,title,body,images,tags,starts_at,ends_at,created_at";

const LOCATION_FIELDS =
  "id,title,category,description,location_images,avg_rating,total_good,total_bad,total_in_between";

const BUSINESS_FIELDS =
  "id,owner_id,name,type,description,cover_image_url,logo_url,tags,avg_rating,total_good,total_bad,total_in_between,is_active";

const isMissingRow = (error) => error?.code === "PGRST116";

export async function fetchLocationPreview(locationId) {
  if (!locationId) return { status: "unavailable", reason: "not-found" };
  try {
    const { data, error } = await supabase
      .from("locations")
      .select(LOCATION_FIELDS)
      .eq("id", locationId)
      .single();
    if (error) {
      if (isMissingRow(error)) return { status: "unavailable", reason: "not-found" };
      return { status: "error", reason: "fetch-failed", message: error.message };
    }
    if (!data) return { status: "unavailable", reason: "not-found" };
    return { status: "ok", data };
  } catch (e) {
    return { status: "error", reason: "network", message: e?.message || "Network error" };
  }
}

export async function fetchBusinessPreview(ownerId) {
  if (!ownerId) return { status: "unavailable", reason: "not-found" };
  try {
    const { data: profile, error } = await supabase
      .from("business_profiles")
      .select(BUSINESS_FIELDS)
      .eq("owner_id", ownerId)
      .single();
    if (error) {
      if (isMissingRow(error)) return { status: "unavailable", reason: "not-found" };
      return { status: "error", reason: "fetch-failed", message: error.message };
    }
    if (!profile) return { status: "unavailable", reason: "not-found" };
    if (profile.is_active === false)
      return { status: "unavailable", reason: "inactive", data: profile };

    const { data: catalogs, count } = await supabase
      .from("business_catalogs")
      .select("id,name", { count: "exact" })
      .eq("business_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(3);

    return {
      status: "ok",
      data: {
        ...profile,
        catalog_count: typeof count === "number" ? count : (catalogs?.length ?? 0),
        top_catalogs: (catalogs ?? []).map((c) => c.name).filter(Boolean),
      },
    };
  } catch (e) {
    return { status: "error", reason: "network", message: e?.message || "Network error" };
  }
}

export async function fetchAnnouncementPreview(announcementId) {
  if (!announcementId) return { status: "unavailable", reason: "not-found" };
  try {
    const { data, error } = await supabase
      .from("announcements")
      .select(ANNOUNCEMENT_FIELDS)
      .eq("id", announcementId)
      .single();
    if (error) {
      if (isMissingRow(error)) return { status: "unavailable", reason: "not-found" };
      return { status: "error", reason: "fetch-failed", message: error.message };
    }
    if (!data) return { status: "unavailable", reason: "not-found" };
    return { status: "ok", data };
  } catch (e) {
    return { status: "error", reason: "network", message: e?.message || "Network error" };
  }
}
