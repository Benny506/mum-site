import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/scroll/ScrollToTop";
import Home from "./components/home/home";
import DeepLinkGate from "./preview/DeepLinkGate";
import Fve311Page from "./fve311/Fve311Page";
import Fve311ListPage from "./fve311/Fve311ListPage";
import { useEffect } from "react";
import Lenis from "lenis";

function HashShim() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash || "";
    if (!hash.startsWith("#/")) return;
    const [hashPath, hashQuery] = hash.slice(1).split("?");
    const target = hashPath === "/" ? null : hashPath;
    if (!target) {
      navigate({ pathname: "/", search: hashQuery ? `?${hashQuery}` : "" }, { replace: true });
      return;
    }
    const known =
      target === "/download" ||
      target === "/fve311" ||
      target === "/fve311/list" ||
      target.startsWith("/single-location/") ||
      target.startsWith("/business-profile/") ||
      target.startsWith("/announcement/") ||
      target.startsWith("/campus-history/") ||
      // TEMP-DRTIM-OFF: target.startsWith("/tutorials") ||
      target === "/subscription" ||
      target.startsWith("/subscription?") ||
      target.startsWith("/signup");
    if (known) {
      navigate(
        { pathname: target, search: hashQuery ? `?${hashQuery}` : window.location.search },
        { replace: true }
      );
    }
  }, [navigate]);

  return null;
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        <HashShim />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/download" element={<Home />} />
          <Route
            path="/single-location/:location_id"
            element={<DeepLinkGate type="location" />}
          />
          <Route
            path="/business-profile/:business_id"
            element={<DeepLinkGate type="business" />}
          />
          <Route
            path="/announcement/:announcement_id"
            element={<DeepLinkGate type="announcement" />}
          />
          <Route
            path="/campus-history/:moment_id"
            element={<DeepLinkGate type="history" />}
          />
          <Route path="/signup" element={<DeepLinkGate type="referral" />} />
          <Route path="/subscription" element={<DeepLinkGate type="subscription" />} />
          <Route path="/fve311" element={<Fve311Page />} />
          <Route path="/fve311/list" element={<Fve311ListPage />} />
          {/* TEMP-DRTIM-OFF: tutorial routes hidden until discount finalized
          <Route path="/tutorials" element={<DeepLinkGate type="tutorial-list" />} />
          <Route
            path="/tutorials/:session_key"
            element={<DeepLinkGate type="tutorial" />}
          />
          */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
