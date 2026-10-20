import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../supabaseClient", () => ({
  default: {},
  SUPABASE_URL: "https://tiwuhxljzjknkvplrxrg.supabase.co",
}));

import supabase from "../supabaseClient";
import { fetchLocationPreview, fetchBusinessPreview, fetchAnnouncementPreview, announcementBannerUrl } from "../previewData";

const chain = (resolved) => {
  const single = vi.fn().mockResolvedValue(resolved);
  const limit = vi.fn().mockReturnValue({ single });
  const order = vi.fn().mockReturnValue({ limit });
  const eq2 = vi.fn().mockReturnValue({ order });
  const eq = vi.fn().mockReturnValue({ single });
  const select = vi.fn().mockImplementation((cols, opts) => {
    if (opts && opts.count === "exact") return { eq: eq2, order };
    return { eq };
  });
  return { select, eq, eq2, single, order, limit };
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("fetchLocationPreview", () => {
  it("returns ok on location hit", async () => {
    const c = chain({ data: { id: "l1", title: " Senate" }, error: null });
    supabase.from = vi.fn().mockReturnValue(c);
    const res = await fetchLocationPreview("l1");
    expect(supabase.from).toHaveBeenCalledWith("locations");
    expect(c.eq).toHaveBeenCalledWith("id", "l1");
    expect(res.status).toBe("ok");
  });

  it("maps missing row (PGRST116) to unavailable", async () => {
    const c = chain({ data: null, error: { code: "PGRST116" } });
    supabase.from = vi.fn().mockReturnValue(c);
    const res = await fetchLocationPreview("gone");
    expect(res.status).toBe("unavailable");
    expect(res.reason).toBe("not-found");
  });
});

describe("fetchBusinessPreview", () => {
  it("looks up by owner_id, not profile id", async () => {
    const profile = { id: "p1", owner_id: "o1", name: "Biz", is_active: true };
    const c = chain({ data: profile, error: null });
    // catalog call returns headers + count
    supabase.from = vi.fn().mockImplementation((table) => {
      if (table === "business_profiles") return c;
      const cat = chain({ data: [{ id: "c1", name: "Cakes" }], error: null });
      cat.eq2.mockReturnValue({
        order: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue({ data: [{ id: "c1", name: "Cakes" }], count: 5, error: null }),
        }),
      });
      return cat;
    });
    const res = await fetchBusinessPreview("o1");
    expect(supabase.from).toHaveBeenCalledWith("business_profiles");
    expect(c.eq).toHaveBeenCalledWith("owner_id", "o1");
    expect(res.status).toBe("ok");
    expect(res.data.top_catalogs).toEqual(["Cakes"]);
    expect(res.data.catalog_count).toBe(5);
  });

  it("maps inactive business to unavailable", async () => {
    const c = chain({
      data: { id: "p1", owner_id: "o1", name: "Biz", is_active: false },
      error: null,
    });
    supabase.from = vi.fn().mockReturnValue(c);
    const res = await fetchBusinessPreview("o1");
    expect(res.status).toBe("unavailable");
    expect(res.reason).toBe("inactive");
  });

  it("maps missing business to unavailable", async () => {
    const c = chain({ data: null, error: { code: "PGRST116" } });
    supabase.from = vi.fn().mockReturnValue(c);
    const res = await fetchBusinessPreview("gone");
    expect(res.status).toBe("unavailable");
  });
});

describe("fetchAnnouncementPreview", () => {
  it("returns ok on announcement hit", async () => {
    const c = chain({ data: { id: "a1", title: "Fees", images: [{ url: "https://x/y.jpg", kind: "image" }] }, error: null });
    supabase.from = vi.fn().mockReturnValue(c);
    const res = await fetchAnnouncementPreview("a1");
    expect(supabase.from).toHaveBeenCalledWith("announcements");
    expect(c.eq).toHaveBeenCalledWith("id", "a1");
    expect(res.status).toBe("ok");
  });

  it("maps missing row (PGRST116) to unavailable", async () => {
    const c = chain({ data: null, error: { code: "PGRST116" } });
    supabase.from = vi.fn().mockReturnValue(c);
    const res = await fetchAnnouncementPreview("gone");
    expect(res.status).toBe("unavailable");
    expect(res.reason).toBe("not-found");
  });

  it("maps empty id to unavailable without fetching", async () => {
    const res = await fetchAnnouncementPreview("");
    expect(res.status).toBe("unavailable");
  });
});

describe("announcementBannerUrl", () => {
  it("picks the first image-kind attachment", () => {
    expect(
      announcementBannerUrl({ images: [{ url: "https://x/doc.pdf", kind: "pdf" }, { url: "https://x/y.jpg", kind: "image" }] })
    ).toBe("https://x/y.jpg");
  });

  it("supports legacy string attachments and empty input", () => {
    expect(announcementBannerUrl({ images: ["https://x/y.jpg"] })).toBe("https://x/y.jpg");
    expect(announcementBannerUrl({ images: [] })).toBeNull();
    expect(announcementBannerUrl(null)).toBeNull();
  });
});
