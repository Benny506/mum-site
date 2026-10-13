import PreviewCTAs from "./PreviewCTAs";
import { APP_DOWNLOAD_URL } from "../constants/links";

export default function ReferralPreview({ refCode, route }) {
  return (
    <div className="mum-preview-card">
      <div className="mum-preview-body">
        <span className="mum-preview-eyebrow">Invite to UniMap</span>
        <h1 className="mum-preview-title">
          {refCode ? `Join with @${refCode}` : "Join UniMap"}
        </h1>
        <p className="mum-preview-sub">
          {refCode
            ? `@${refCode} invited you to UniMap — campus navigation, places, and student businesses. Install the app and use their referral code when you sign up.`
            : "Install the UniMap app to navigate campus, discover places, and support student businesses."}
        </p>
        <PreviewCTAs deepUrl={APP_DOWNLOAD_URL} route={route} entityType="referral" />
      </div>
    </div>
  );
}
