import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/scroll/ScrollToTop";
import Home from "./components/home/home";
import { useEffect } from "react";
import Lenis from "lenis";

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
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/download" element={<Home />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

// import { useState } from "react";
// import "./App.css";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import { NavLink, BrowserRouter, HashRouter } from "react-router-dom";
// import logoWithName from "./assets/images/logoAndName.png";
// import Home from "./components/home/home";

// function Navigation({
//   onAboutClick,
//   onFeaturesClick,
//   onHowItWorkClick,
//   onFaqsClick,
// }) {
//   const [show, setShow] = useState(false);
//   const [activeSection, setActiveSection] = useState("home");

//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);

//   const handleSectionClick = (section, onClickFunction) => {
//     setActiveSection(section);
//     if (onClickFunction) {
//       onClickFunction();
//     }
//     handleClose();
//   };

//   const myWhatsAppNumber = "2349039341520";
//   const preFilledMessage =
//     "Hello! I'm interested in your services. Can we chat?";
//   const cleanedPhoneNumber = myWhatsAppNumber.replace(/[^0-9]/g, "");
//   const encodedMessage = encodeURIComponent(preFilledMessage);

//   const whatsappLink = `https://wa.me/${cleanedPhoneNumber}?text=${encodedMessage}`;

//   return (
//     <div className="fixed-top spacing-50 bg-ff4 d-flex align-items-center justify-content-center">
//       <div className="d-flex justify-content-between align-items-center col-12">
//         <img src={logoWithName} />
//         <div className="d-flex align-items-center col-5 justify-content-between d-lg-flex d-none">
//           <NavLink
//             to="/"
//             style={{
//               color: activeSection === "home" ? "#FA0808" : "#737373",
//             }}
//             onClick={() => handleSectionClick("home")}
//             className="text-decoration-none txt-73 fw-600 fs-16"
//           >
//             Home{" "}
//           </NavLink>{" "}
//           <button
//             onClick={() => handleSectionClick("about", onAboutClick)}
//             className="text-decoration-none fw-600 fs-16"
//             style={{
//               color: activeSection === "about" ? "#FA0808" : "#737373",
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             About{" "}
//           </button>{" "}
//           <button
//             onClick={() => handleSectionClick("features", onFeaturesClick)}
//             className="text-decoration-none fw-600 fs-16"
//             style={{
//               color: activeSection === "features" ? "#FA0808" : "#737373",
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             Features{" "}
//           </button>{" "}
//           <button
//             onClick={() => handleSectionClick("howItWorks", onHowItWorkClick)}
//             className="text-decoration-none fw-600 fs-16"
//             style={{
//               color: activeSection === "howItWorks" ? "#FA0808" : "#737373",
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             How it works{" "}
//           </button>{" "}
//           <button
//             onClick={() => handleSectionClick("faqs", onFaqsClick)}
//             className="text-decoration-none fw-600 fs-16"
//             style={{
//               color: activeSection === "faqs" ? "#FA0808" : "#737373",
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             FAQs{" "}
//           </button>{" "}
//         </div>{" "}
//         <a
//           style={{ textDecoration: "none" }}
//           href={whatsappLink}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           {" "}
//           <button
//             className="d-none d-lg-flex align-items-center"
//             style={{
//               backgroundColor: "#FA0808",
//               borderRadius: "40px",
//               padding: "13px 18px",
//               color: "white",
//             }}
//           >
//             <p className="mb-0 fw-500">Contact us</p>{" "}
//           </button>{" "}
//         </a>{" "}
//         <div
//           onClick={handleShow}
//           className="d-lg-none"
//           style={{
//             cursor: "pointer",
//             width: "40px",
//             height: "40px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "5px",
//           }}
//         >
//           {" "}
//           <div
//             style={{ width: "30px", height: "3px", backgroundColor: "black" }}
//           ></div>{" "}
//           <div
//             style={{ width: "30px", height: "3px", backgroundColor: "black" }}
//           ></div>{" "}
//           <div
//             style={{ width: "30px", height: "3px", backgroundColor: "black" }}
//           ></div>{" "}
//         </div>{" "}
//         <Offcanvas
//           show={show}
//           onHide={handleClose}
//           placement="end"
//           className=""
//           style={{ backgroundColor: "#737373" }}
//         >
//           <Offcanvas.Header closeButton></Offcanvas.Header>{" "}
//           <Offcanvas.Body>
//             {" "}
//             <div
//               style={{ borderRadius: "20px" }}
//               className="bg-ff pt-4 d-flex flex-column d-lg-flex justify-content-center align-items-center"
//             >
//               {" "}
//               <div
//                 className="d-flex flex-column mb-5 justify-content-between align-items-center"
//                 style={{ height: "250px" }}
//               >
//                 {" "}
//                 <NavLink
//                   to="/"
//                   style={{
//                     color: activeSection === "home" ? "#FA0808" : "#737373",
//                   }}
//                   onClick={() => handleSectionClick("home")}
//                   className="hovering txt-16 lh-19 fw-600 mb-3 text-decoration-none txt-f3"
//                   end
//                 >
//                   Home{" "}
//                 </NavLink>{" "}
//                 <button
//                   onClick={() => handleSectionClick("about", onAboutClick)}
//                   className="hovering txt-16 lh-19 fw-600 mb-3 text-decoration-none txt-f3"
//                   style={{
//                     color: activeSection === "about" ? "#FA0808" : "#737373",
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                   }}
//                   end
//                 >
//                   About
//                 </button>
//                 <button
//                   onClick={() =>
//                     handleSectionClick("features", onFeaturesClick)
//                   }
//                   className="hovering txt-16 lh-19 fw-600 mb-3 text-decoration-none txt-f3"
//                   style={{
//                     color: activeSection === "features" ? "#FA0808" : "#737373",
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                   }}
//                   end
//                 >
//                   Features{" "}
//                 </button>{" "}
//                 <button
//                   onClick={() =>
//                     handleSectionClick("howItWorks", onHowItWorkClick)
//                   }
//                   className="hovering txt-16 lh-19 fw-600 mb-3 text-decoration-none txt-f3"
//                   style={{
//                     color:
//                       activeSection === "howItWorks" ? "#FA0808" : "#737373",
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                   }}
//                   end
//                 >
//                   How it works{" "}
//                 </button>{" "}
//                 <button
//                   onClick={() => handleSectionClick("faqs", onFaqsClick)}
//                   className="hovering txt-16 lh-19 fw-600 mb-3 text-decoration-none txt-f3"
//                   style={{
//                     color: activeSection === "faqs" ? "#FA0808" : "#737373",
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                   }}
//                   end
//                 >
//                   FAQs{" "}
//                 </button>{" "}
//                 <a
//                   style={{ textDecoration: "none" }}
//                   href={whatsappLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {" "}
//                   <button
//                     className="d-flex align-items-center"
//                     style={{
//                       backgroundColor: "#FA0808",
//                       borderRadius: "40px",
//                       padding: "13px 18px",
//                       color: "white",
//                     }}
//                   >
//                     {" "}
//                     <p className="mb-0 fw-500">Contact us</p>{" "}
//                   </button>{" "}
//                 </a>{" "}
//               </div>{" "}
//             </div>{" "}
//           </Offcanvas.Body>{" "}
//         </Offcanvas>{" "}
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <HashRouter>
//       <Routes>
//         <Navigation />
//         <Home />
//       </Routes>
//     </HashRouter>
//   );
// }

// export default App;
