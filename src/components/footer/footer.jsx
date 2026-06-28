import React from 'react';
import Lottie from 'lottie-react';
import { LiaLinkedin } from "react-icons/lia";
import { BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import footerLogoWithName from "../../assets/images/footerLogoWithName.png";
import companyLogo from "../../assets/images/companyLogoAndName.png";
import "./footer.css";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "../../constants/contact";

import lottieJump from "../../assets/lotties/College-student-jumping.json";
import lottieNavigate from "../../assets/lotties/Navigation.json";
import lottieFriends from "../../assets/lotties/friends.json";

function Footer() {
  const cleanedPhoneNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);

  const whatsappLink = `https://wa.me/${cleanedPhoneNumber}?text=${encodedMessage}`;

  return (
    <div className="mt-5 pt-5 pb-4 position-relative overflow-hidden footer-container">

      {/* Playful Background Blobs */}
      <div className="footer-blob blob-red"></div>
      <div className="footer-blob blob-blue"></div>
      <div className="footer-blob blob-yellow"></div>

      {/* ========================================================
          PRE-FOOTER CTA (Lottie Showcase)
      ======================================================== */}
      <div className="container text-center mb-5 pb-5 position-relative" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', zIndex: 1 }}>
        <div className="fs-32 fw-600 text-white mb-5">Your Campus, Simplified.</div>

        <div className="row justify-content-center align-items-end mb-5 gap-5 gap-md-0">
          <div className="col-12 col-md-4 d-flex flex-column align-items-center">
            <div style={{ height: 220 }} className="d-flex align-items-end">
              <Lottie animationData={lottieNavigate} loop={true} style={{ height: '100%' }} />
            </div>
            <div className="text-white fw-500 fs-19 mt-4 px-2">Explore effortlessly without getting lost.</div>
          </div>

          <div className="col-12 col-md-4 d-flex flex-column align-items-center">
            <div style={{ height: 220 }} className="d-flex align-items-end">
              <Lottie animationData={lottieFriends} loop={true} style={{ height: '90%' }} />
            </div>
            <div className="text-white fw-500 fs-19 mt-4 px-2">Stay connected with friends on the go.</div>
          </div>

          <div className="col-12 col-md-4 d-flex flex-column align-items-center">
            <div style={{ height: 220 }} className="d-flex align-items-end">
              <Lottie animationData={lottieJump} loop={true} style={{ height: '100%' }} />
            </div>
            <div className="text-white fw-500 fs-19 mt-4 px-2">Refer, climb the ranks, and win big.</div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-3 mt-4 flex-wrap">
          <Link to="/download" className="text-decoration-none d-inline-block">
            <div className="d-inline-flex align-items-center gap-2 bg-danger text-white px-5 py-3 rounded-pill fw-bold fs-19 shadow-lg hover-scale transition border border-danger">
              Download App
            </div>
          </Link>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-decoration-none d-inline-block">
            <div className="d-inline-flex align-items-center gap-2 bg-white text-danger px-5 py-3 rounded-pill fw-bold fs-19 shadow-lg hover-scale transition">
              <BsWhatsapp size={24} />
              Contact Support
            </div>
          </a>
        </div>
      </div>

      {/* ========================================================
          MINIMALIST BOTTOM FOOTER
      ======================================================== */}
      <div className="container text-white position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-between align-items-center flex-column flex-md-row gap-4">

          {/* Brand Info */}
          <div className="col-12 col-md-5 d-flex flex-column gap-3 text-center text-md-start">
            <div className="d-flex justify-content-center justify-content-md-start">
              <img src={footerLogoWithName} alt="Logo" style={{ maxWidth: 200 }} />
            </div>
            <div className="fs-14 fw-400 opacity-75">
              MyUniMap is a trademark of Control Genesis, dedicated to building smart, student-focused tools that make everyday campus life simpler, seamless, and stress-free.
            </div>
            {/* <div className="d-flex gap-3 justify-content-center justify-content-md-start mt-2">
              <LiaLinkedin size={26} className="cursor hover-opacity" />
              <BsTwitter size={22} className="cursor hover-opacity" />
              <FaFacebook size={22} className="cursor hover-opacity" />
              <BsInstagram size={22} className="cursor hover-opacity" />
            </div> */}
          </div>

          {/* Credits & Legal */}
          <div className="col-12 col-md-4 d-flex flex-column align-items-center align-items-md-end gap-3 text-center text-md-end">
            <div className="fs-19 fw-700">Built by Students, for Students</div>
            <a href="https://controlgenesis.com/" target="_blank" rel="noopener noreferrer" className="mt-2 text-decoration-none">
              <div className="opacity-75 fs-12 mb-1 text-white">FROM</div>
              <img src={companyLogo} alt="Control Genesis" style={{ maxWidth: 150 }} />
            </a>
            <div className="fs-12 opacity-50 mt-3 d-flex gap-2 justify-content-center justify-content-md-end flex-wrap">
              <span>© 2025 Control Genesis.</span>
              <span>All rights reserved.</span>
              {/* <span className="cursor hover-opacity text-decoration-underline mx-1">Privacy & Terms</span> */}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Footer;
