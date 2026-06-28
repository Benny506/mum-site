import { useState } from "react";
import CustomSvg from "../customSvg/CustomSvg";
import "./faq.css";

function Faq() {
  const [openStates, setOpenStates] = useState({
    open: false,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
  });

  const handleToggle = (key) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const AnimatedFaqItem = ({ question, answer, isOpen, onClick }) => {
    return (
      <div
        className="collapseMargin bg-ffd shadow-sm"
        onClick={onClick}
        style={{ cursor: "pointer", padding: "18px 24px", borderRadius: "10px", overflow: "hidden", border: "1px solid #f8f8f8" }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div className="fs-19 fw-500 text-dark">{question}</div>
          <div style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
            <CustomSvg name={isOpen ? "minus" : "plus"} />
          </div>
        </div>
        <div
          style={{
            maxHeight: isOpen ? "200px" : "0px",
            opacity: isOpen ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out",
            marginTop: isOpen ? "15px" : "0px"
          }}
        >
          <div className="fs-15 fw-400 opacity-75" style={{ paddingBottom: "5px" }}>
            {answer}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-5 txt-00 pt-5 overflow-hidden">
      <div className="pt-5" />
      <div style={{ maxWidth: "454px", margin: "auto", textAlign: "center", position: 'relative' }}>

        <style>
          {`
            @keyframes floatFAQ {
              0% { transform: translateY(0px) rotate(15deg); }
              50% { transform: translateY(-20px) rotate(5deg); }
              100% { transform: translateY(0px) rotate(15deg); }
            }
          `}
        </style>

        {/* Floating FAQ Question Mark */}
        <div
          className="position-absolute text-danger fw-bold opacity-25 d-none d-md-block"
          style={{ fontSize: '150px', top: '-80px', right: '-120px', zIndex: 0, animation: 'floatFAQ 4s ease-in-out infinite', userSelect: 'none', lineHeight: 1 }}
        >
          ?
        </div>

        <div className="d-flex align-items-center justify-content-center position-relative" style={{ zIndex: 1 }}>
          <div
            style={{
              width: "30px",
              height: "2px",
              backgroundColor: "white",
              borderRadius: "3px",
              marginRight: "15px",
            }}
          ></div>
          <div className="fs-19 fw-600">FAQs</div>
        </div>
        <div className="fs-45 fw-600 mb-5 position-relative" style={{ zIndex: 1 }}>
          Have Inquiries? Find Answers Here.
        </div>
      </div>
      <div className="position-relative" style={{ zIndex: 1 }}>
        <AnimatedFaqItem
          question="Is MyUniMap free?"
          answer="Yes. You can download and use the app free during early access."
          isOpen={openStates.open}
          onClick={() => handleToggle("open")}
        />
        <AnimatedFaqItem
          question="Does it work on Android?"
          answer="Yes — full launch is for both iOS and Android."
          isOpen={openStates.open1}
          onClick={() => handleToggle("open1")}
        />
        <AnimatedFaqItem
          question="Will it track someone without their permission?"
          answer="No. Location sharing is fully permission-based."
          isOpen={openStates.open2}
          onClick={() => handleToggle("open2")}
        />
        <AnimatedFaqItem
          question="Do I need internet?"
          answer="Yes, but we’re working on ways to save key locations for offline use."
          isOpen={openStates.open3}
          onClick={() => handleToggle("open3")}
        />
        <AnimatedFaqItem
          question="What makes MyUniMap different from Google map?"
          answer="Unlike Google Maps, UNIMAP is specifically built for UNICAL, providing a more accurate and detailed navigation experience. It can be directly updated by the university with campus-specific information like departments, lecture halls, and new buildings. While UNIMAP may use Google Maps as a base, the key advantage is this added layer of precise, campus-specific data that Google Maps lacks."
          isOpen={openStates.open4}
          onClick={() => handleToggle("open4")}
        />
      </div>
    </div>
  );
}

export default Faq;