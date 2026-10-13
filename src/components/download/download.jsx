import { useEffect } from "react";
import { APPLE_STORE_LINK, GOOGLE_PLAY_LINK } from "../../constants/links";

function Download() {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Detect iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href = APPLE_STORE_LINK;
      return;
    }

    // Detect Android
    if (/android/i.test(userAgent)) {
      window.location.href = GOOGLE_PLAY_LINK;
      return;
    }

    // If it's a desktop browser, do nothing and let the UI render
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FA0808', color: 'white', fontFamily: 'sans-serif' }}>
      <h1>Get MUM on your Phone</h1>
      <p>Scan the QR code or visit this page on your mobile device to download the app.</p>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <a href={APPLE_STORE_LINK} target="_blank" rel="noreferrer" style={{ padding: '15px 30px', backgroundColor: 'black', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold' }}>
          Download on iOS
        </a>
        <a href={GOOGLE_PLAY_LINK} target="_blank" rel="noreferrer" style={{ padding: '15px 30px', backgroundColor: 'black', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold' }}>
          Download on Android
        </a>
      </div>
    </div>
  );
}

export default Download;
