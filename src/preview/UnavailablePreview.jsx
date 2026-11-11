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
  history: {
    eyebrow: "Shared campus story",
    title: "This story is no longer available",
    sub: "The shared history story may have been removed. Get the app to explore UNICAL moments and VC records.",
  },
  // TEMP-DRTIM-OFF: tutorial: {
  //   eyebrow: "Shared tutorial",
  //   title: "This tutorial is no longer available",
  //   sub: "The shared tutorial session may have ended or been removed. Get the app to see current Dr Tim sessions.",
  // },
  subscription: {
    eyebrow: "MyUniMap Premium",
    title: "Subscription preview unavailable",
    sub: "Check your connection and try again, or get the app to see premium plans.",
  },
  network: {
    eyebrow: "Connection issue",
    title: "Preview could not load",
    sub: "Check your connection and try again, or get the app to see this content.",
  },
};

export default function UnavailablePreview({ kind = "location", route, entityType, onRetry }) {
  const copy = COPY[kind] || COPY.location;
  const deepUrl =
    typeof window !== "undefined" ? window.location.href : APP_DOWNLOAD_URL;
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
          <PreviewCTAs deepUrl={deepUrl} entityUrl={deepUrl} route={route} entityType={entityType} />
          <Link className="mum-preview-link" to="/">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
