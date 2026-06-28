import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import '../../InteractivePhone/InteractivePhone.css';
import testimonial1 from '../../../assets/images/testimonial1.png';
import unCover from '../../../assets/images/uncover.svg';

export default function LocationScreen() {
  const controlsMapPan = useAnimation();
  const controlsRoute = useAnimation();
  const controlsPanel = useAnimation();
  const controlsCursor = useAnimation();
  const controlsModal = useAnimation();
  const controlsDestMarker = useAnimation();

  useEffect(() => {
    let isMounted = true;

    const sequence = async () => {
      while (isMounted) {
        // 1. Reset all states to Idle
        await controlsMapPan.set({ x: 0, y: 0 });
        await controlsRoute.set({ pathLength: 0, opacity: 1 });
        await controlsPanel.set({ y: 150, opacity: 0 });
        await controlsCursor.set({ x: 170, y: 650, scale: 1, opacity: 0 });
        await controlsModal.set({ y: "100%", opacity: 1 });
        await controlsDestMarker.set({ opacity: 0, scale: 0 });

        // Wait a moment at idle
        await new Promise(r => setTimeout(r, 600));
        if (!isMounted) break;

        // 2. Cursor appears and moves to "Where to?" search bar
        await controlsCursor.start({ y: 120, opacity: 0.7, transition: { duration: 0.6, ease: "easeOut" } });

        // 3. Cursor taps
        await controlsCursor.start({ scale: 0.7, transition: { duration: 0.1 } });
        await controlsCursor.start({ scale: 1, transition: { duration: 0.1 } });

        // 4. Modal slides up over the screen
        controlsModal.start({ y: "0%", transition: { type: "spring", damping: 25, stiffness: 250 } });
        await new Promise(r => setTimeout(r, 600));

        // 5. Cursor moves down to tap "Pav F"
        await controlsCursor.start({ y: 235, transition: { duration: 0.5, ease: "easeOut" } });

        // 6. Cursor taps "Pav F"
        await controlsCursor.start({ scale: 0.7, transition: { duration: 0.1 } });
        await controlsCursor.start({ scale: 1, transition: { duration: 0.1 } });

        // 7. Modal closes, cursor disappears
        controlsCursor.start({ opacity: 0, transition: { duration: 0.2 } });
        await controlsModal.start({ y: "100%", transition: { duration: 0.4, ease: "easeInOut" } });

        // 8. Destination marker pops in
        await controlsDestMarker.start({ opacity: 1, scale: 1, transition: { type: "spring", stiffness: 350 } });

        // 9. Draw realistic jagged route to destination
        await controlsRoute.start({
          pathLength: 1,
          transition: { duration: 1.5, ease: "easeInOut" }
        });
        if (!isMounted) break;

        // 10. Pan the map down and right to reveal destination
        controlsMapPan.start({
          x: -120,
          y: -180,
          transition: { duration: 0.8, ease: "easeInOut" }
        });

        await new Promise(r => setTimeout(r, 800));
        if (!isMounted) break;

        // 11. Pop up the destination panel
        await controlsPanel.start({
          y: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 350, damping: 20 }
        });

        // 12. Hold view
        await new Promise(r => setTimeout(r, 2000));
        if (!isMounted) break;

        // Fade out and restart
        controlsRoute.start({ opacity: 0, transition: { duration: 0.5 } });
        await controlsPanel.start({ y: 150, opacity: 0, transition: { duration: 0.5 } });
      }
    };

    sequence();

    return () => { isMounted = false; };
  }, [controlsMapPan, controlsRoute, controlsPanel, controlsCursor, controlsModal, controlsDestMarker]);

  const pathData = "M 270 545 L 270 590 L 320 590 L 320 640 L 350 640 L 350 690 L 390 690 L 390 725";

  return (
    <div className="w-100 h-100 position-relative overflow-hidden" style={{ background: '#E8E5DF' }}>
      {/* Map Background Layer (Pans) */}
      <motion.div className="map-layer" animate={controlsMapPan}>
        <div className="map-roads"></div>

        {/* Route Line SVG */}
        <svg className="route-svg" viewBox="0 0 600 1000">
          <motion.path
            d={pathData}
            className="route-path"
            initial={{ pathLength: 0 }}
            animate={controlsRoute}
          />
        </svg>

        {/* "You" Marker */}
        <div className="marker-you" style={{ left: 250, top: 525 }}>
          {/* User Bubble Card */}
          <div className="marker-card you-card">
            <img src={testimonial1} alt="Profile" className="marker-profile" />
            <span className="marker-username">Gabriella</span>
          </div>
          <div className="marker-you-dot"></div>
        </div>

        {/* Destination Marker */}
        <motion.div className="marker-dest" style={{ left: 380, top: 715 }} animate={controlsDestMarker}>
          {/* Dest Bubble Card */}
          <div className="marker-card dest-card">
            <img src={unCover} alt="Building" className="marker-icon" />
            <span className="marker-username">PAV F</span>
          </div>
        </motion.div>

      </motion.div>

      {/* Floating Header UI (Static) */}
      <div className="phone-header">
        <div className="hamburger">
          <span></span><span></span><span></span>
        </div>
        <div className="unimap-logo">UNIMAP</div>
      </div>

      {/* Floating Search Bar */}
      <div className="search-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        Where to?
      </div>

      {/* Search Modal Overlay */}
      <motion.div className="search-modal" animate={controlsModal} initial={{ y: "100%" }}>
        <div className="modal-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          Search
        </div>
        <div className="modal-list">
          <div className="modal-item">
            <div className="modal-icon"><img src={unCover} alt="Icon" /></div>
            Edu Auditorium
          </div>
          <div className="modal-item">
            <div className="modal-icon"><img src={unCover} alt="Icon" /></div>
            Pav F
          </div>
          <div className="modal-item">
            <div className="modal-icon"><img src={unCover} alt="Icon" /></div>
            Prof. Eka Braide
          </div>
        </div>
      </motion.div>

      {/* Floating Destination Panel (Pops up at end) */}
      <motion.div
        className="preview-panel"
        initial={{ y: 150, opacity: 0 }}
        animate={controlsPanel}
      >
        <img className="preview-img" src={unCover} alt="Pav F Building" />
        <div className="preview-text">
          <div className="preview-title">Where you are going</div>
          <div className="preview-dest">PAV F</div>
        </div>
      </motion.div>

      {/* Simulated Touch Cursor */}
      <motion.div className="touch-cursor" animate={controlsCursor}></motion.div>
    </div>
  );
}
