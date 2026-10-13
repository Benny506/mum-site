import PreviewCTAs from "./PreviewCTAs";
import { businessCoverUrl, businessLogoUrl } from "./previewData";

const formatCount = (n) => {
  const v = Number(n) || 0;
  if (v >= 1000) return `${(v / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(v);
};

export default function BusinessPreview({ profile, route }) {
  const cover = businessCoverUrl(profile);
  const logo = businessLogoUrl(profile);
  const deepUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://my-uni-map.com/business-profile/${profile?.owner_id ?? ""}`;
  const tags = Array.isArray(profile?.tags) ? profile.tags.slice(0, 6) : [];
  const hasRating =
    Number(profile?.avg_rating) > 0 ||
    (profile?.total_good ?? 0) > 0 ||
    (profile?.total_bad ?? 0) > 0 ||
    (profile?.total_in_between ?? 0) > 0;

  return (
    <div className="mum-preview-card">
      {cover && (
        <img className="mum-preview-cover" src={cover} alt={`${profile?.name ?? "Shared business"} cover`} />
      )}
      <div className="mum-preview-body">
        <span className="mum-preview-eyebrow">Shared business on UniMap</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          {logo && (
            <img
              src={logo}
              alt={`${profile?.name ?? "Business"} logo`}
              style={{ width: 56, height: 56, borderRadius: 16, objectFit: "cover" }}
            />
          )}
          <h1 className="mum-preview-title" style={{ margin: 0 }}>
            {profile?.name ?? "Shared business"}
          </h1>
        </div>
        {profile?.type && (
          <p className="mum-preview-sub" style={{ textTransform: "capitalize", fontWeight: 700 }}>
            {profile.type}
          </p>
        )}
        {hasRating && (
          <div className="mum-preview-rating" aria-label="Rating summary">
            {Number(profile?.avg_rating) > 0 && <span>★ {Number(profile.avg_rating).toFixed(1)}</span>}
            <span>
              👍 {formatCount(profile?.total_good)} · 👎 {formatCount(profile?.total_bad)} · 😐{" "}
              {formatCount(profile?.total_in_between)}
            </span>
          </div>
        )}
        {tags.length > 0 && (
          <div className="mum-preview-tags">
            {tags.map((t) => (
              <span key={t} className="mum-preview-tag">
                {t}
              </span>
            ))}
          </div>
        )}
        {profile?.description && <p className="mum-preview-sub">{profile.description}</p>}
        {(profile?.catalog_count ?? 0) > 0 && (
          <p className="mum-preview-sub">
            {profile.catalog_count} catalog{profile.catalog_count === 1 ? "" : "s"}
            {(profile?.top_catalogs ?? []).length > 0 &&
              `: ${(profile.top_catalogs ?? []).slice(0, 3).join(" · ")}`}
            . See more inside the app.
          </p>
        )}
        <PreviewCTAs deepUrl={deepUrl} route={route} entityType="business" />
      </div>
    </div>
  );
}
