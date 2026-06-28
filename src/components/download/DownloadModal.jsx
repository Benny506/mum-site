import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import deviceLottie from "../../assets/lotties/devic.json";
import { FaTimes, FaApple, FaAndroid, FaCheckCircle, FaCopy } from 'react-icons/fa';
import { APPLE_STORE_LINK, GOOGLE_PLAY_LINK, APP_DOWNLOAD_URL } from "../../constants/links";

function DownloadModal({ onClose }) {
  const [status, setStatus] = useState("Identifying your device...");
  const [deviceFound, setDeviceFound] = useState(null);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        setDeviceFound('apple');
        setStatus("iOS Device Detected! Redirecting...");
        setTimeout(() => { window.location.href = APPLE_STORE_LINK; }, 1500);
      } else if (/android/i.test(userAgent)) {
        setDeviceFound('android');
        setStatus("Android Device Detected! Redirecting...");
        setTimeout(() => { window.location.href = GOOGLE_PLAY_LINK; }, 1500);
      } else {
        setDeviceFound('desktop');
        setStatus("Please visit on your mobile device.");
      }
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(APP_DOWNLOAD_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="position-fixed w-100 h-100 top-0 start-0 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, backdropFilter: 'blur(15px)' }}>
       <div className="bg-white rounded-4 p-5 d-flex flex-column align-items-center text-center shadow-lg mx-3 position-relative" style={{ maxWidth: 450, width: "100%" }}>
          
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="position-absolute border-0 bg-transparent text-muted hover-opacity"
            style={{ top: '20px', right: '20px', cursor: 'pointer' }}
          >
            <FaTimes size={24} />
          </button>

          <div style={{ width: 180, position: 'relative' }}>
            <Lottie animationData={deviceLottie} loop={true} />
            
            {/* Device Badges */}
            {deviceFound === 'apple' && (
              <div className="position-absolute bg-white shadow rounded-circle d-flex align-items-center justify-content-center" style={{ width: 60, height: 60, bottom: -10, right: -10, zIndex: 10, animation: 'pulseBlob 1s infinite alternate' }}>
                <FaApple size={35} color="#000" />
                <FaCheckCircle className="position-absolute text-success bg-white rounded-circle" size={20} style={{ top: -5, right: -5 }} />
              </div>
            )}
            {deviceFound === 'android' && (
              <div className="position-absolute bg-white shadow rounded-circle d-flex align-items-center justify-content-center" style={{ width: 60, height: 60, bottom: -10, right: -10, zIndex: 10, animation: 'pulseBlob 1s infinite alternate' }}>
                <FaAndroid size={35} color="#3DDC84" />
                <FaCheckCircle className="position-absolute text-success bg-white rounded-circle" size={20} style={{ top: -5, right: -5 }} />
              </div>
            )}
          </div>
          
          <div className="fs-23 fw-600 mt-4 text-dark">{status}</div>
          
          {/* Desktop Fallback: QR Code & Link */}
          {deviceFound === 'desktop' && (
            <div className="mt-4 d-flex flex-column align-items-center w-100">
              <div className="text-muted fs-15 mb-4">
                Scan this QR code with your iPhone or Android camera to download MyUniMap.
              </div>
              <div className="p-2 bg-white border rounded-3 shadow-sm mb-4">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(APP_DOWNLOAD_URL)}`} alt="QR Code" style={{ width: 150, height: 150 }} />
              </div>
              <div className="w-100 text-start">
                <div className="fs-12 fw-bold text-muted mb-1 text-uppercase">Or copy this link</div>
                <div className="d-flex w-100 border rounded-3 overflow-hidden">
                  <div className="bg-light p-3 flex-grow-1 fs-14 text-truncate text-muted border-end">
                    {APP_DOWNLOAD_URL}
                  </div>
                  <button onClick={handleCopy} className="border-0 bg-white px-4 hover-opacity d-flex align-items-center gap-2 text-danger fw-bold">
                    <FaCopy /> {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}
       </div>
    </div>
  )
}

export default DownloadModal;
