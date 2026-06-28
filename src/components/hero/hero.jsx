import playStore from "../../assets/images/playStore.png";
import appleStore from "../../assets/images/appleStore.png";
import mumOnPhone from "../../assets/images/mumOnPhone.png";
import unCover from "../../assets/images/uncover.svg";
import navigate from "../../assets/images/navigate.svg";
import connect from "../../assets/images/connect.svg";
import "./hero.css";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticWrapper from "../MagneticWrapper";
import InteractivePhone from "../InteractivePhone/InteractivePhone";
import { APPLE_STORE_LINK, GOOGLE_PLAY_LINK } from "../../constants/links";

function Hero() {
  // Use global window scroll for a simple, natural parallax effect on the cards
  const { scrollY } = useScroll();

  // Left card floats up as you scroll down
  const leftCardY = useTransform(scrollY, [0, 800], [150, -150]);
  // Right cards drop down as you scroll down
  const rightCardY = useTransform(scrollY, [0, 800], [-150, 150]);

  // Kinetic Typography Setup (Entrance animation only, no scroll effects)
  const title = "Find Every Corner of Your Campus And Your Friends Too.";
  const titleWords = title.split(" ");

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
  };

  const wordVariants = {
    hidden: { y: "150%", opacity: 0, rotate: 5 },
    visible: {
      y: "0%",
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
    }
  };

  return (
    <div className="bg-ff4 w-100 overflow-hidden" style={{ paddingTop: "120px" }}>

      {/* BLOCK 1: Text & Buttons (Natural spacing, entrance animation only) */}
      <div className="d-flex flex-column align-items-center text-center px-3 mb-5 pb-4">
        <motion.div
          className="spacing-50 fs-63 fw-600 d-flex flex-wrap justify-content-center gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {titleWords.map((word, index) => (
            <div key={index} style={{ overflow: "hidden", display: "inline-block" }}>
              <motion.span style={{ display: "inline-block", transformOrigin: "bottom left" }} variants={wordVariants}>
                {word}
              </motion.span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="spacing-50-adjusted fw-400 fs-19 col-10 col-md-8 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
          From hidden restrooms and food joints to that one POS that actually works — our campus navigation app helps you see what Google doesn’t. <b>Made by students, for students.</b>
        </motion.div>

        <motion.div
          className="d-flex gap-4 mt-5 flex-column flex-md-row spacing-50-adjusted"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        >
          <MagneticWrapper>
            <a href={GOOGLE_PLAY_LINK} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
              <motion.button
                className="d-flex gap-3 txt-ff bg-00 border-0"
                style={{ borderRadius: "10px", padding: "7px 20px" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={playStore} alt="Play Store" />
                <div className="text-start">
                  <div className="fs-11 fw-600">Available on</div>
                  <div className="fs-19 fw-600">Google Play</div>
                </div>
              </motion.button>
            </a>
          </MagneticWrapper>

          <MagneticWrapper>
            <a href={APPLE_STORE_LINK} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
              <motion.button
                className="d-flex gap-3 txt-ff bg-00 border-0"
                style={{ borderRadius: "10px", padding: "7px 20px" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={appleStore} alt="Apple Store" />
                <div className="text-start">
                  <div className="fs-11 fw-600">Available on</div>
                  <div className="fs-19 fw-600">Apple Store</div>
                </div>
              </motion.button>
            </a>
          </MagneticWrapper>
        </motion.div>
      </div>

      {/* BLOCK 2: Phone & Parallax Cards (Normal document flow, no sticky, no scaling) */}
      <div className="d-flex flex-column align-items-center flex-xl-row wavyBackground justify-content-center w-100 gap-4 position-relative">

        {/* Left Card */}
        <motion.div
          className="text-start bg-ffb p-4 d-none d-xl-block"
          style={{ maxWidth: "284px", minWidth: "264px", borderRadius: "16px", y: leftCardY, zIndex: 10 }}
        >
          <div><img src={unCover} alt="Uncover" /></div>
          <div className="fs-16 fw-500 mt-4 mb-3">Uncover Hidden Campus Spots</div>
          <div className="fs-13 fw-400">
            Restrooms, food joints, study nooks, and hangout corners — discover the places only students talk about.
          </div>
        </motion.div>

        {/* Center Phone (Interactive Simulation) */}
        <div style={{ zIndex: 5, display: "flex", justifyContent: "center", width: "100%", maxWidth: "427px", position: "relative" }}>
          <InteractivePhone />
        </div>

        {/* Right Cards */}
        <motion.div
          className="d-none d-xl-flex flex-column gap-5"
          style={{ y: rightCardY, zIndex: 10, marginTop: "-120px" }}
        >
          <div className="text-start bg-ffb p-4 ms-5" style={{ maxWidth: "284px", minWidth: "248px", borderRadius: "16px" }}>
            <div><img src={navigate} alt="Navigate" /></div>
            <div className="fs-16 fw-500 mt-4 mb-3">Navigate Shortcuts With Ease</div>
            <div className="fs-13 fw-400">
              Forget long detours and confusing hallways. Find the fastest paths to classes, hostels, or food spots.
            </div>
          </div>
          <div className="text-start bg-ffb p-4" style={{ maxWidth: "284px", minWidth: "250px", borderRadius: "16px" }}>
            <div><img src={connect} alt="Connect" /></div>
            <div className="fs-16 fw-500 mt-4 mb-3">Connect Faster With Friends</div>
            <div className="fs-13 fw-400">
              From group projects to lunch breaks, see where your circle is and link up instantly.
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Hero;