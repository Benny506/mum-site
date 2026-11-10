import { useState } from "react";
import {
  APPLE_STORE_LINK,
  GOOGLE_PLAY_LINK,
  APP_DOWNLOAD_URL,
} from "../constants/links";
import { trackOpenAppTap, trackStoreTap } from "./previewAnalytics";

function detectDesktop() {
  if (typeof navigator === "undefined") return true;
  const ua = navigator.userAgent || "";
  return !/iPad|iPhone|iPod|android/i.test(ua);
}

export default function PreviewCTAs({ deepUrl, entityUrl, route, entityType, compact = false }) {
  const [copied, setCopied] = useState(false);
  const isDesktop = detectDesktop();
  const shareUrl = entityUrl || deepUrl || APP_DOWNLOAD_URL;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mum-preview-ctas">
      <a
        className="mum-preview-btn mum-preview-btn-primary"
        href={deepUrl}
        onClick={() => trackOpenAppTap({ route, entityType })}
      >
        Open in App
      </a>
      <div className="mum-preview-stores">
        <a
          className="mum-preview-btn mum-preview-btn-dark"
          href={APPLE_STORE_LINK}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackStoreTap({ route, entityType, store: "apple" })}
        >
          App Store
        </a>
        <a
          className="mum-preview-btn mum-preview-btn-dark"
          href={GOOGLE_PLAY_LINK}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackStoreTap({ route, entityType, store: "google" })}
        >
          Google Play
        </a>
      </div>
      {(isDesktop || compact) && (
        <div className="mum-preview-qr">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
              shareUrl
            )}`}
            alt="QR code to open this shared page"
            loading="lazy"
          />
          <div>
            <p className="mum-preview-sub" style={{ marginBottom: 8 }}>
              Scan with your phone camera to open this page.
            </p>
            <button
              type="button"
              className="mum-preview-btn mum-preview-btn-light"
              style={{ padding: "10px 14px", fontSize: 14 }}
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
