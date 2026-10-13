import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/scroll/ScrollToTop";
import Home from "./components/home/home";
import DeepLinkGate from "./preview/DeepLinkGate";
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
      target.startsWith("/single-location/") ||
      target.startsWith("/business-profile/") ||
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
          <Route path="/signup" element={<DeepLinkGate type="referral" />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
