import PreviewCTAs from "./PreviewCTAs";

function excerpt(text, max = 220) {
  const clean = String(text || "").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).trimEnd()}…`;
}

export default function HistoryPreview({ moment, route }) {
  const deepUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://my-uni-map.com/campus-history/${moment?.id ?? ""}`;
  return (
    <div className="mum-preview-card">
      <div className="mum-preview-body">
        <span className="mum-preview-eyebrow">Shared campus story on UniMap</span>
        <h1 className="mum-preview-title">{moment?.title ?? "Shared campus story"}</h1>
        {moment?.yearDisplay && (
          <p className="mum-preview-sub" style={{ fontWeight: 700 }}>
            {moment.yearDisplay}
          </p>
        )}
        {moment?.tldr && <p className="mum-preview-sub">{excerpt(moment.tldr)}</p>}
        <p className="mum-preview-sub">Open this story in the UniMap app to see photos, related VCs, and sources.</p>
        <PreviewCTAs deepUrl={deepUrl} entityUrl={deepUrl} route={route} entityType="history" />
      </div>
    </div>
  );
}
