import PreviewCTAs from "./PreviewCTAs";
import { locationCoverUrl } from "./previewData";

const formatCount = (n) => {
  const v = Number(n) || 0;
  if (v >= 1000) return `${(v / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(v);
};

export default function LocationPreview({ location, route }) {
  const cover = locationCoverUrl(location);
  const deepUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://my-uni-map.com/single-location/${location?.id ?? ""}`;
  const hasRating =
    Number(location?.avg_rating) > 0 ||
    (location?.total_good ?? 0) > 0 ||
    (location?.total_bad ?? 0) > 0 ||
    (location?.total_in_between ?? 0) > 0;

  return (
    <div className="mum-preview-card">
      {cover && (
        <img className="mum-preview-cover" src={cover} alt={`${location?.title ?? "Shared place"} cover`} />
      )}
      <div className="mum-preview-body">
        <span className="mum-preview-eyebrow">Shared place on UniMap</span>
        <h1 className="mum-preview-title">{location?.title ?? "Shared place"}</h1>
        {location?.category && (
          <p className="mum-preview-sub" style={{ textTransform: "capitalize", fontWeight: 700 }}>
            {location.category}
          </p>
        )}
        {hasRating && (
          <div className="mum-preview-rating" aria-label="Rating summary">
            {Number(location?.avg_rating) > 0 && <span>★ {Number(location.avg_rating).toFixed(1)}</span>}
            <span>
              👍 {formatCount(location?.total_good)} · 👎 {formatCount(location?.total_bad)} · 😐{" "}
              {formatCount(location?.total_in_between)}
            </span>
          </div>
        )}
        {location?.description && <p className="mum-preview-sub">{location.description}</p>}
        <p className="mum-preview-sub">Open this place in the UniMap app to navigate, pin, and review it.</p>
        <PreviewCTAs deepUrl={deepUrl} route={route} entityType="location" />
      </div>
    </div>
  );
}
