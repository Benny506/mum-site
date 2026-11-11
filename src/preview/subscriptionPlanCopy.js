// Single source of truth for Free vs Premium plan display.
// Consumed by web SubscriptionPreview; app SubscriptionScreen MUST match.
// Owl quota is monthly (30 free / 200 premium) — never daily.

export const MONTH_PRICE_NGN = 500;
export const MONTH_DAYS = 30;
export const WEEK_PRICE_NGN = 200;
export const WEEK_DAYS = 7;

export const FREE_FOREVER = [
  "Map & navigation",
  "Search, Discover & region browsing",
  "Chat with anyone",
  "Tags, ratings & giving reviews",
  "Receiving pings",
  "30 Owl answers a month",
];

export const PREMIUM_UNLOCKS = [
  "200 Owl answers a month",
  "Unlimited ping sends",
  "Full history & reviews",
  "Unlimited schedules with every repeat",
  "Full question bank with answers",
  "Timed practice exams with instant marking",
  "My Spots — your private campus pins",
  // TEMP-DRTIM-OFF: "Dr Tim tutorial discounts when you pay in-app",
  "No ads",
];

export const PRICE_LINE = `NGN ${MONTH_PRICE_NGN} / ${MONTH_DAYS} days • NGN ${WEEK_PRICE_NGN} / ${WEEK_DAYS} days. No auto-renew.`;

export const GRACE_NOTE =
  "No auto-renew. You pay once, premium runs its days, with a 48-hour grace at the end. Money goes to servers, maps and Owl.";
