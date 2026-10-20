import { Link } from "react-router-dom";
import PreviewCTAs from "./PreviewCTAs";
import { APP_DOWNLOAD_URL } from "../constants/links";

const COPY = {
  location: {
    eyebrow: "Shared place",
    title: "This place is no longer available",
    sub: "The shared location may have been removed. Get the app to explore campus places.",
  },
  business: {
    eyebrow: "Shared business",
    title: "This business is no longer available",
    sub: "The shared business profile may have been removed or deactivated. Get the app to discover student businesses.",
  },
  referral: {
    eyebrow: "Invite",
    title: "This invite link is incomplete",
    sub: "No referral code was included. You can still get the app and join campus life.",
  },
  announcement: {
    eyebrow: "Shared announcement",
    title: "This announcement is no longer available",
    sub: "The shared announcement may have been removed. Get the app to see the latest campus news.",
  },
  network: {
    eyebrow: "Connection issue",
    title: "Preview could not load",
    sub: "Check your connection and try again, or get the app to see this content.",
  },
};

export default function UnavailablePreview({ kind = "location", route, entityType, onRetry }) {
  const copy = COPY[kind] || COPY.location;
  return (
    <div className="mum-preview-card">
      <div className="mum-preview-body mum-preview-state">
        <span className="mum-preview-eyebrow">{copy.eyebrow}</span>
        <h1 className="mum-preview-title">{copy.title}</h1>
        <p className="mum-preview-sub">{copy.sub}</p>
        <div className="mum-preview-ctas">
          {onRetry && (
            <button
              type="button"
              className="mum-preview-btn mum-preview-btn-light"
              onClick={onRetry}
            >
              Try again
            </button>
          )}
          <PreviewCTAs deepUrl={APP_DOWNLOAD_URL} route={route} entityType={entityType} />
          <Link className="mum-preview-link" to="/">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
