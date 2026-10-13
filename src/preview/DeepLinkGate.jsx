import { useEffect, useState } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import Navigation from "../components/navigation/navigation";
import LocationPreview from "./LocationPreview";
import BusinessPreview from "./BusinessPreview";
import ReferralPreview from "./ReferralPreview";
import UnavailablePreview from "./UnavailablePreview";
import { fetchLocationPreview, fetchBusinessPreview, locationCoverUrl, businessCoverUrl } from "./previewData";
import { trackPreviewView, trackUnavailableView } from "./previewAnalytics";
import "./preview.css";

const BRAND_TITLE = "UNIMAP — Find your way on campus";
const BRAND_DESC =
  "UNIMAP helps you find your way on campus. Get directions to buildings, lecture halls, and student businesses.";

function setMeta(title, desc, image) {
  document.title = title;
  const descTag = document.querySelector('meta[name="description"]');
  if (descTag) descTag.setAttribute("content", desc);
  const ensureMeta = (property) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", property);
      document.head.appendChild(tag);
    }
    return tag;
  };
  ensureMeta("og:title").setAttribute("content", title);
  ensureMeta("og:description").setAttribute("content", desc);
  if (image) ensureMeta("og:image").setAttribute("content", image);
}

export default function DeepLinkGate({ type }) {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [state, setState] = useState({ status: "loading" });
  const [nonce, setNonce] = useState(0);

  const route = location.pathname;
  const id =
    type === "location"
      ? params.location_id
      : type === "business"
        ? params.business_id
        : null;
  const refCode = type === "referral" ? searchParams.get("ref") : null;

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    if (type === "referral") {
      const status = "ok";
      trackPreviewView({ route, entityType: "referral", status });
      setMeta(
        refCode ? `Join UniMap with @${refCode}` : BRAND_TITLE,
        BRAND_DESC
      );
      setState({ status: "ok", refCode });
      return undefined;
    }

    const run = async () => {
      const res =
        type === "location"
          ? await fetchLocationPreview(id)
          : await fetchBusinessPreview(id);
      if (cancelled) return;
      const entityType = type === "location" ? "location" : "business";
      if (res.status === "ok") {
        trackPreviewView({ route, entityType, status: "ok" });
        const title =
          type === "location" ? res.data.title : res.data.name;
        const image =
          type === "location"
            ? locationCoverUrl(res.data)
            : businessCoverUrl(res.data);
        setMeta(`${title} on UniMap`, res.data.description || BRAND_DESC, image);
      } else {
        trackPreviewView({ route, entityType, status: res.status });
        trackUnavailableView({ route, entityType, reason: res.reason });
        setMeta(BRAND_TITLE, BRAND_DESC);
      }
      setState(res);
    };
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, id, refCode, nonce]);

  return (
    <div>
      <Navigation />
      <main className="mum-preview-page">
        {state.status === "loading" && (
          <div className="mum-preview-card">
            <div className="mum-preview-body mum-preview-state" role="status" aria-live="polite">
              <div className="mum-preview-spinner" aria-hidden="true" />
              <p className="mum-preview-sub">Loading shared preview…</p>
            </div>
          </div>
        )}
        {state.status === "ok" && type === "location" && (
          <LocationPreview location={state.data} route={route} />
        )}
        {state.status === "ok" && type === "business" && (
          <BusinessPreview profile={state.data} route={route} />
        )}
        {state.status === "ok" && type === "referral" && (
          <ReferralPreview refCode={state.refCode} route={route} />
        )}
        {state.status === "unavailable" && (
          <UnavailablePreview
            kind={type === "business" ? "business" : type === "referral" ? "referral" : "location"}
            route={route}
            entityType={type}
            onRetry={undefined}
          />
        )}
        {state.status === "error" && (
          <UnavailablePreview
            kind="network"
            route={route}
            entityType={type}
            onRetry={() => setNonce((n) => n + 1)}
          />
        )}
      </main>
    </div>
  );
}
