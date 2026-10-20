import PreviewCTAs from "./PreviewCTAs";
import { announcementBannerUrl } from "./previewData";

function dateState(startsAt, endsAt, now = new Date()) {
  if (!startsAt && !endsAt) return null;
  const nowMs = now.getTime();
  const startMs = startsAt ? new Date(startsAt).getTime() : null;
  const endMs = endsAt ? new Date(endsAt).getTime() : null;
  if (startMs && !Number.isNaN(startMs) && nowMs < startMs) return "Upcoming";
  if (endMs && !Number.isNaN(endMs) && nowMs > endMs) return "Ended";
  return "Ongoing";
}

function excerpt(body, max = 220) {
  const text = String(body || "").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

export default function AnnouncementPreview({ announcement, route }) {
  const banner = announcementBannerUrl(announcement);
  const deepUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://my-uni-map.com/announcement/${announcement?.id ?? ""}`;
  const tags = Array.isArray(announcement?.tags) ? announcement.tags.slice(0, 5) : [];
  const state = dateState(announcement?.starts_at, announcement?.ends_at);
  const posted = announcement?.created_at
    ? new Date(announcement.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="mum-preview-card">
      {banner && (
        <img className="mum-preview-cover" src={banner} alt={`${announcement?.title ?? "Shared announcement"} banner`} />
      )}
      <div className="mum-preview-body">
        <span className="mum-preview-eyebrow">Shared announcement on UniMap</span>
        <h1 className="mum-preview-title">{announcement?.title ?? "Shared announcement"}</h1>
        {(state || posted) && (
          <p className="mum-preview-sub" style={{ fontWeight: 700 }}>
            {[state, posted ? `Posted ${posted}` : null].filter(Boolean).join(" · ")}
          </p>
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
        {announcement?.body && <p className="mum-preview-sub">{excerpt(announcement.body)}</p>}
        <p className="mum-preview-sub">Open this announcement in the UniMap app to see photos, places, and actions.</p>
        <PreviewCTAs deepUrl={deepUrl} route={route} entityType="announcement" />
      </div>
    </div>
  );
}
