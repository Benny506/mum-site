// FVE 311 Digital Entrepreneurship — isolated constants.
// FVE311_OPEN/CLOSE_WAT duplicated verbatim in backend migration
// backend/supabase/migrations/20261113000000_add_fve311_registrations.sql

export const FVE311_OPEN_WAT = "2026-11-01T00:00:00+01:00";
export const FVE311_CLOSE_WAT = "2026-11-20T23:59:59+01:00";

export const FVE311_OPEN_MS = Date.parse(FVE311_OPEN_WAT);
export const FVE311_CLOSE_MS = Date.parse(FVE311_CLOSE_WAT);

export const YEAR_OPTIONS = [1, 2, 3, 4];

export const SKILL_SUGGESTIONS = [
  "Content Creation & Monetization",
  "Graphic Design",
  "Web Development",
  "Social Media Management",
  "Digital Marketing",
  "Video Editing",
  "Photography",
  "Copywriting & Freelancing",
  "E-commerce & Dropshipping",
  "UI/UX Design",
  "Data Analysis",
  "Virtual Assistance",
  "Online Tutoring",
  "Agripreneurship Tech",
];

export const REG_ALPHABET = "0123456789";

export function generateRegNumber(randomFn = Math.random) {
  let suffix = "";
  for (let i = 0; i < 6; i += 1) {
    const idx = Math.floor(randomFn() * REG_ALPHABET.length);
    suffix += REG_ALPHABET[idx];
  }
  return `FVE311-${suffix}`;
}

// Spaced for read-aloud, e.g. "FVE311-123456" -> "123 456"
export function spacedPin(regNumber) {
  const suffix = String(regNumber || "").split("-")[1] || "";
  return suffix.length === 6 ? `${suffix.slice(0, 3)} ${suffix.slice(3)}` : suffix;
}

export function buildReceiptText(row) {
  const lines = [
    "FVE 311 - DIGITAL ENTREPRENEURSHIP",
    "Course Registration Receipt 2026",
    "==================================",
    `Registration Number: ${row.reg_number} (read aloud: ${spacedPin(row.reg_number)})`,
    `Name: ${row.full_name}`,
    `Mat. No: ${row.mat_no}`,
    `Department: ${row.department}`,
    `Year of Study: ${row.year_of_study}`,
    `Skill: ${row.skill_interest}`,
    `Registered: ${row.created_at || new Date().toISOString()}`,
    "==================================",
    "Keep this number safe. You will need it for the course.",
  ];
  return lines.join("\n");
}

export function getWindowState(nowMs = Date.now(), openMs = FVE311_OPEN_MS, closeMs = FVE311_CLOSE_MS) {
  if (nowMs < openMs) return "upcoming";
  if (nowMs > closeMs) return "closed";
  return "live";
}

export function getCountdownParts(targetMs, nowMs = Date.now()) {
  const diff = Math.max(0, targetMs - nowMs);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

export function toCsv(rows) {
  const header = ["reg_number", "full_name", "mat_no", "department", "year_of_study", "skill_interest", "created_at"];
  const escape = (v) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [header.join(","), ...rows.map((r) => header.map((k) => escape(r[k])).join(","))].join("\n");
}
