import React from "react";
import FeaturesPhone from "./FeaturesPhone";

const FeatureCard = ({ title, desc, screenType, badge }) => (
  <div className="d-flex flex-column align-items-center text-center w-100 mb-5 position-relative">
    {/* Floating Edge Badge */}
    {badge && (
      <div 
        className="position-absolute bg-white text-danger fw-bold shadow hover-scale"
        style={{
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          border: '1px solid #fcfcfc',
          top: '30%',
          right: '5%',
          zIndex: 10,
          transform: 'rotate(5deg)'
        }}
      >
        {badge}
      </div>
    )}

    <div style={{ minHeight: '120px', maxWidth: '400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
      <div className="fs-30 fw-600 mb-2">{title}</div>
      <div className="fs-16 fw-400 opacity-75">{desc}</div>
    </div>
    <div className="phone-scale-wrapper" style={{ height: "60vh", minHeight: "450px", marginTop: "20px", position: 'relative', zIndex: 2 }}>
      <FeaturesPhone screenType={screenType} />
    </div>
  </div>
);

function Features() {
  const features = [
    {
      title: "Basic Location Finding",
      desc: "Find exactly where you need to go with real photos and accurate campus routing.",
      type: "location",
      badge: "🎯 Arrive in 3 mins"
    },
    {
      title: "Smart Scheduling",
      desc: "Never miss a class or event. Create smart schedules with location-aware reminders.",
      type: "schedule",
      badge: "⏰ Next Class: 10:00 AM"
    },
    {
      title: "Business Profiles",
      desc: "Discover campus businesses. Set up profiles that allow the entire campus to see what you offer.",
      type: "business",
      badge: "⭐ 4.9 (120 Reviews)"
    },
    {
      title: "Friend Pinging",
      desc: "Track and find your friends on campus effortlessly. Send a quick ping to meet up.",
      type: "ping",
      badge: "📍 200m away"
    }
  ];

  return (
    <div className="mt-5 w-100 overflow-hidden position-relative">
      
      {/* Background Floating SVGs */}
      <style>
        {`
          @keyframes slowSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div className="position-absolute d-none d-md-block" style={{ top: '10%', left: '-5%', opacity: 0.03, animation: 'slowSpin 40s linear infinite', zIndex: 0 }}>
        <svg width="600" height="600" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ce1010" d="M42.7,-73.4C55.9,-67.8,67.6,-57.4,75.3,-44.6C82.9,-31.8,86.5,-15.9,87.1,0.3C87.7,16.5,85.2,33,76.5,46C67.8,59,52.8,68.5,37.3,74.3C21.8,80.1,5.8,82.2,-9.3,80.4C-24.4,78.6,-38.7,72.8,-51.2,63.6C-63.7,54.4,-74.5,41.7,-81.1,26.7C-87.8,11.7,-90.4,-5.9,-86.6,-22.1C-82.8,-38.3,-72.6,-53.2,-58.9,-59.8C-45.2,-66.4,-27.9,-64.8,-13.4,-67.2C1.1,-69.6,15.6,-76.1,29.3,-79C43.1,-81.9,56.1,-81.2,42.7,-73.4Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="position-absolute d-none d-md-block" style={{ bottom: '10%', right: '-5%', opacity: 0.03, animation: 'slowSpin 50s linear infinite reverse', zIndex: 0 }}>
        <svg width="500" height="500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ce1010" d="M37.9,-64.1C47.8,-52.3,53.8,-38.6,60.8,-24.1C67.7,-9.7,75.6,5.6,74.7,20.4C73.8,35.2,64.2,49.5,50.7,58.7C37.3,67.8,20.1,71.8,2.8,67.1C-14.5,62.5,-31.8,49.1,-46.8,35.1C-61.9,21,-74.6,6.3,-77,-9.4C-79.3,-25,-71.4,-41.7,-58.5,-53C-45.7,-64.3,-28,-70.2,-12.3,-68.8C3.3,-67.4,18.7,-58.6,37.9,-64.1Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* ========================================================
          STANDARD GRID LAYOUT (Desktop & Mobile)
      ======================================================== */}
      <div className="w-100 px-3 px-md-5 py-5 position-relative" style={{ zIndex: 1 }}>
        <div className="row m-0 w-100">
          {features.map((feature, index) => (
            <div key={index} className="col-12 col-lg-6 mb-5">
              <FeatureCard title={feature.title} desc={feature.desc} screenType={feature.type} badge={feature.badge} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Features;