import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import About from "../about/about";
import Hero from "../hero/hero";
import Features from "../features/features";
import HowItWorks from "../howItWorks/howItWorks";
import Testimonials from "../testimonials/Testimonials";
import Faqs from "../faqs/faqs";
import Navigation from "../navigation/navigation";
import Footer from "../footer/footer";
import Team from "../team/team";
import DownloadModal from "../download/DownloadModal";

function Home() {
  const refHome = useRef(null);
  const refFaqs = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("/download") || location.pathname.includes("/download")) {
      setShowDownloadModal(true);
    } else {
      setShowDownloadModal(false);
    }
  }, [location]);

  const handleCloseModal = () => {
    setShowDownloadModal(false);
    navigate("/");
  };
  const refHowItWork = useRef(null);
  const refFeatures = useRef(null);
  const refAbout = useRef(null);

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (refFaqs.current && scrollPosition > refFaqs.current.offsetTop) {
        setActiveSection("faqs");
      } else if (
        refHowItWork.current &&
        scrollPosition > refHowItWork.current.offsetTop
      ) {
        setActiveSection("howItWorks");
      } else if (
        refFeatures.current &&
        scrollPosition > refFeatures.current.offsetTop
      ) {
        setActiveSection("features");
      } else if (
        refAbout.current &&
        scrollPosition > refAbout.current.offsetTop
      ) {
        setActiveSection("about");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      {showDownloadModal && <DownloadModal onClose={handleCloseModal} />}
      <Navigation />

      <div ref={refHome} style={{ paddingTop: "70px" }}>
        <Hero />
      </div>

      <div ref={refAbout}>
        <About />
      </div>

      <div ref={refFeatures}>
        <Features />
      </div>

      <div ref={refHowItWork}>
        <HowItWorks />
      </div>

      <div>
        <Testimonials />
      </div>

      <div ref={refFaqs}>
        <Faqs />
      </div>

      <div>
        <Footer activeSection={activeSection} />
      </div>
    </div>
  );
}

export default Home;