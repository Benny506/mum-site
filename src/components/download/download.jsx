import { useEffect } from "react";

function Download() {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Detect iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href = "https://apps.apple.com/app/idYOUR_APPLE_APP_ID";
      return;
    }

    // Detect Android
    if (/android/i.test(userAgent)) {
      window.location.href = "https://play.google.com/store/apps/details?id=com.controlgenesis.mum";
      return;
    }

    // If it's a desktop browser, do nothing and let the UI render
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FA0808', color: 'white', fontFamily: 'sans-serif' }}>
      <h1>Get MUM on your Phone</h1>
      <p>Scan the QR code or visit this page on your mobile device to download the app.</p>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <a href="https://apps.apple.com/app/idYOUR_APPLE_APP_ID" target="_blank" rel="noreferrer" style={{ padding: '15px 30px', backgroundColor: 'black', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold' }}>
          Download on iOS
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.controlgenesis.mum" target="_blank" rel="noreferrer" style={{ padding: '15px 30px', backgroundColor: 'black', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold' }}>
          Download on Android
        </a>
      </div>
    </div>
  );
}

export default Download;
