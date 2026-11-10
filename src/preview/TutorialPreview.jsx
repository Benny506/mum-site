import PreviewCTAs from "./PreviewCTAs";

const NGN = (n) => `NGN ${Number(n || 0).toLocaleString("en-NG")}`;

function discounted(session) {
  if (!session) return 0;
  return Math.round(Number(session.full_price_ngn) * (1 - Number(session.discount_percent || 0) / 100));
}

function describe(session) {
  if (!session) return "Dr Tim's Tutorials on UniMap";
  const bits = [session.category, session.mode].filter(Boolean).join(" · ");
  const price = `${NGN(session.full_price_ngn)} full${session.discount_percent ? ` · ${session.discount_percent}% off on premium` : ""}`;
  return `${bits ? `${bits}. ` : ""}${price}.`;
}

export default function TutorialPreview({ session, sessions, route, variant = "detail" }) {
  if (variant === "list") {
    const count = Array.isArray(sessions) ? sessions.length : 0;
    const deepUrl = typeof window !== "undefined" ? window.location.href : "https://my-uni-map.com/tutorials";
    return (
      <div className="mum-preview-card">
        <div className="mum-preview-body">
          <span className="mum-preview-eyebrow">Dr Tim&apos;s Tutorials on UniMap</span>
          <h1 className="mum-preview-title">Dr Tim&apos;s Tutorials</h1>
          <p className="mum-preview-sub">
            {count > 0
              ? `${count} active sessions — physical and online. Open in the UniMap app to see prices, premium discounts, and pay in-app.`
              : "Physical and online tutorials. Open in the UniMap app to see sessions, premium discounts, and pay in-app."}
          </p>
          {Array.isArray(sessions) && sessions.length > 0 && (
            <ul className="mum-preview-list">
              {sessions.slice(0, 6).map((s) => (
                <li key={s.session_key || s.id}>
                  {s.title} — {NGN(s.full_price_ngn)}
                  {s.discount_percent ? ` (${s.discount_percent}% off on premium)` : ""}
                </li>
              ))}
            </ul>
          )}
          <PreviewCTAs deepUrl={deepUrl} entityUrl={deepUrl} route={route} entityType="tutorial" />
        </div>
      </div>
    );
  }

  const deepUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://my-uni-map.com/tutorials/${session?.session_key ?? ""}`;
  const disc = discounted(session);
  return (
    <div className="mum-preview-card">
      <div className="mum-preview-body">
        <span className="mum-preview-eyebrow">Dr Tim&apos;s Tutorial on UniMap</span>
        <h1 className="mum-preview-title">{session?.title ?? "Tutorial session"}</h1>
        <p className="mum-preview-sub" style={{ fontWeight: 700 }}>
          {[session?.category, session?.mode].filter(Boolean).join(" · ")}
        </p>
        <p className="mum-preview-sub">{describe(session)}</p>
        {session && (
          <p className="mum-preview-sub">
            Full price {NGN(session.full_price_ngn)}
            {session.discount_percent ? ` · Premium pays ${NGN(disc)} (${session.discount_percent}% off)` : ""}.
            Pay securely in-app.
          </p>
        )}
        <PreviewCTAs deepUrl={deepUrl} entityUrl={deepUrl} route={route} entityType="tutorial" />
      </div>
    </div>
  );
}
