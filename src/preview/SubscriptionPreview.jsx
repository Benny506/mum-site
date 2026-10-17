import PreviewCTAs from "./PreviewCTAs";

const FREE_FOREVER = [
  "Map & navigation",
  "Search, Discover & region browsing",
  "Chat with anyone",
  "Tags, ratings & giving reviews",
  "Receiving pings",
  "10 Owl answers a day",
];

const PREMIUM_UNLOCKS = [
  "Higher Owl limit",
  "Unlimited ping sends",
  "Full history, reviews & key insights",
  "Unlimited schedules with every repeat",
  "Full business profile tools",
  "No ads",
];

export default function SubscriptionPreview({ route }) {
  return (
    <div className="mum-preview-card">
      <div className="mum-preview-body">
        <span className="mum-preview-eyebrow">MyUniMap Premium</span>
        <h1 className="mum-preview-title">
          Keep MyUniMap&apos;s core features free!
        </h1>
        <p className="mum-preview-sub">
          Premium keeps core navigation free for everyone — subscribing
          sustains the core of the app while unlocking more for you.
        </p>
        <h2 className="mum-preview-section">Free forever</h2>
        <ul className="mum-preview-list">
          {FREE_FOREVER.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <h2 className="mum-preview-section">Premium unlocks</h2>
        <ul className="mum-preview-list">
          {PREMIUM_UNLOCKS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="mum-preview-sub">
          NGN 500 / 30 days • NGN 200 / 7 days. No auto-renew.
        </p>
        <PreviewCTAs
          deepUrl="https://my-uni-map.com/subscription"
          route={route}
          entityType="subscription"
        />
      </div>
    </div>
  );
}
