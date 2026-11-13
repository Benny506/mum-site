import { describe, it, expect } from "vitest";
import { generateRegNumber, getWindowState, getCountdownParts, toCsv, spacedPin, buildReceiptText } from "../constants";

describe("generateRegNumber", () => {
  it("matches FVE311-XXXXXX digits-only PIN", () => {
    for (let i = 0; i < 50; i += 1) {
      const code = generateRegNumber();
      expect(code).toMatch(/^FVE311-[0-9]{6}$/);
    }
  });
});

describe("getWindowState", () => {
  const open = Date.parse("2026-11-01T00:00:00+01:00");
  const close = Date.parse("2026-11-20T23:59:59+01:00");
  it("returns upcoming/live/closed around the window", () => {
    expect(getWindowState(open - 1000, open, close)).toBe("upcoming");
    expect(getWindowState(open, open, close)).toBe("live");
    expect(getWindowState(close, open, close)).toBe("live");
    expect(getWindowState(close + 1000, open, close)).toBe("closed");
  });
});

describe("getCountdownParts", () => {
  it("splits ms into d/h/m/s", () => {
    const parts = getCountdownParts(90061000, 0);
    expect(parts).toEqual({ days: 1, hours: 1, minutes: 1, seconds: 1 });
  });
});

describe("toCsv", () => {
  it("exports header plus quoted rows", () => {
    const csv = toCsv([{ reg_number: "FVE311-ABCDEF", full_name: 'Doe, "Jane"', mat_no: "M1", department: "FVE", year_of_study: 2, skill_interest: "Design", created_at: "2026-11-02" }]);
    expect(csv.split("\n")).toHaveLength(2);
    expect(csv).toContain('"Doe, ""Jane"""');
  });
});

describe("spacedPin", () => {
  it("groups a 6-digit suffix for read-aloud", () => {
    expect(spacedPin("FVE311-123456")).toBe("123 456");
  });
});

describe("buildReceiptText", () => {
  it("includes reg number, read-aloud PIN and candidate details", () => {
    const txt = buildReceiptText({ reg_number: "FVE311-123456", full_name: "Ada Test", mat_no: "T1", department: "FVE", year_of_study: 2, skill_interest: "Design", created_at: "2026-11-13" });
    expect(txt).toContain("FVE311-123456");
    expect(txt).toContain("123 456");
    expect(txt).toContain("Ada Test");
  });
});
