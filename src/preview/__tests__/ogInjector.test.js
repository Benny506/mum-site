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
});
