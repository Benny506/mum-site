import PreviewCTAs from "./PreviewCTAs";
import {
  FREE_FOREVER,
  PREMIUM_UNLOCKS,
  PRICE_LINE,
  GRACE_NOTE,
} from "./subscriptionPlanCopy";

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
          {PRICE_LINE}
        </p>
        <p className="mum-preview-sub" style={{ fontSize: 13, opacity: 0.85 }}>
          {GRACE_NOTE}
        </p>
        <PreviewCTAs
          deepUrl={typeof window !== "undefined" ? window.location.href : "https://my-uni-map.com/subscription"}
          entityUrl={typeof window !== "undefined" ? window.location.href : "https://my-uni-map.com/subscription"}
          route={route}
          entityType="subscription"
        />
      </div>
    </div>
  );
}
