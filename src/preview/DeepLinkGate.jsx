import { useEffect, useState } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import Navigation from "../components/navigation/navigation";
import LocationPreview from "./LocationPreview";
import BusinessPreview from "./BusinessPreview";
import AnnouncementPreview from "./AnnouncementPreview";
import HistoryPreview from "./HistoryPreview";
import ReferralPreview from "./ReferralPreview";
import SubscriptionPreview from "./SubscriptionPreview";
// TEMP-DRTIM-OFF: import TutorialPreview from "./TutorialPreview";
import UnavailablePreview from "./UnavailablePreview";
import { fetchLocationPreview, fetchBusinessPreview, fetchAnnouncementPreview, fetchTutorialPreview, fetchTutorialListPreview, locationCoverUrl, businessOgImageUrl, announcementBannerUrl } from "./previewData";
import { fetchHistoryPreview } from "./historyPreviewData";
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
        : type === "announcement"
          ? params.announcement_id
          : type === "history"
            ? params.moment_id
            // TEMP-DRTIM-OFF: : type === "tutorial"
            // TEMP-DRTIM-OFF:   ? params.session_key
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

    if (type === "subscription") {
      trackPreviewView({ route, entityType: "subscription", status: "ok" });
      setMeta(
        "MyUniMap Premium — keep core features free",
        "Premium unlocks more Owl, unlimited pings, full history and more, while keeping MyUniMap's core navigation free for everyone."
      );
      setState({ status: "ok" });
      return undefined;
    }

    // TEMP-DRTIM-OFF: tutorial-list preview hidden until discount finalized
    // if (type === "tutorial-list") {
    //   const runList = async () => {
    //     const res = await fetchTutorialListPreview();
    //     if (cancelled) return;
    //     if (res.status === "ok") {
    //       trackPreviewView({ route, entityType: "tutorial", status: "ok" });
    //       setMeta("Dr Tim's Tutorials on UniMap", BRAND_DESC, null);
    //     } else {
    //       trackPreviewView({ route, entityType: "tutorial", status: res.status });
    //       trackUnavailableView({ route, entityType: "tutorial", reason: res.reason });
    //       setMeta(BRAND_TITLE, BRAND_DESC);
    //     }
    //     setState(res);
    //   };
    //   runList();
    //   return undefined;
    // }

    const run = async () => {
      const res =
        type === "location"
          ? await fetchLocationPreview(id)
          : type === "business"
            ? await fetchBusinessPreview(id)
            : type === "history"
              ? await fetchHistoryPreview(id)
              // TEMP-DRTIM-OFF: : type === "tutorial"
              // TEMP-DRTIM-OFF:   ? await fetchTutorialPreview(id)
              : await fetchAnnouncementPreview(id);
      if (cancelled) return;
      const entityType = type === "location" ? "location" : type === "business" ? "business" : type === "history" ? "history" : type === "tutorial" ? "tutorial" : "announcement";
      if (res.status === "ok") {
        trackPreviewView({ route, entityType, status: "ok" });
        const title =
          type === "location" ? res.data.title : type === "business" ? res.data.name : res.data.title;
        const image =
          type === "location"
            ? locationCoverUrl(res.data)
            : type === "business"
              ? businessOgImageUrl(res.data)
              : type === "history"
                ? null
                // TEMP-DRTIM-OFF: : type === "tutorial"
                // TEMP-DRTIM-OFF:   ? null
                : announcementBannerUrl(res.data);
        const excerpt = (type === "announcement" || type === "history") && (res.data.body || res.data.tldr)
          ? String(res.data.body || res.data.tldr).slice(0, 200)
          // TEMP-DRTIM-OFF: : type === "tutorial"
          // TEMP-DRTIM-OFF:   ? `${[res.data.category, res.data.mode].filter(Boolean).join(" · ")} — NGN ${Number(res.data.full_price_ngn || 0).toLocaleString("en-NG")}`
          : res.data.description;
        setMeta(`${title} on UniMap`, excerpt || BRAND_DESC, image);
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
        {state.status === "ok" && type === "subscription" && (
          <SubscriptionPreview route={route} />
        )}
        {state.status === "ok" && type === "announcement" && (
          <AnnouncementPreview announcement={state.data} route={route} />
        )}
        {state.status === "ok" && type === "history" && (
          <HistoryPreview moment={state.data} route={route} />
        )}
        {/* TEMP-DRTIM-OFF: tutorial previews hidden until discount finalized
        {state.status === "ok" && type === "tutorial" && (
          <TutorialPreview session={state.data} route={route} variant="detail" />
        )}
        {state.status === "ok" && type === "tutorial-list" && (
          <TutorialPreview sessions={state.data} route={route} variant="list" />
        )}
        */}
        {state.status === "unavailable" && (
          <UnavailablePreview
            kind={type === "business" ? "business" : type === "referral" ? "referral" : type === "announcement" ? "announcement" : type === "history" ? "history" : type === "subscription" ? "subscription" : "location"}
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
