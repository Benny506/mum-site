import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import '../../InteractivePhone/InteractivePhone.css';
import testimonial1 from '../../../assets/images/testimonial1.png';
import avatar3 from '../../../assets/images/generated/avatar_3_1782649686002.png';

export default function PingScreen() {
  const controlsRadar = useAnimation();
  const controlsFriend = useAnimation();
  const controlsModal = useAnimation();
  const controlsCursor = useAnimation();

  useEffect(() => {
    let isMounted = true;
    const sequence = async () => {
      while (isMounted) {
        // Reset
        await controlsRadar.set({ scale: 0, opacity: 0 });
        await controlsFriend.set({ scale: 0, opacity: 0, y: 20 });
        await controlsModal.set({ y: -150, opacity: 0 });
        await controlsCursor.set({ x: 170, y: 550, scale: 1, opacity: 0 });

        await new Promise(r => setTimeout(r, 500));
        if (!isMounted) break;

        // Radar pulses
        controlsRadar.start({
          scale: [0, 4],
          opacity: [0.8, 0],
          transition: { duration: 1.2, ease: "easeOut", repeat: 2 }
        });

        await new Promise(r => setTimeout(r, 800));
        if (!isMounted) break;

        // Friend pops up
        await controlsFriend.start({ scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 350 } });

        await new Promise(r => setTimeout(r, 300));
        if (!isMounted) break;

        // Modal drops
        await controlsModal.start({ y: 20, opacity: 1, transition: { type: "spring", stiffness: 350 } });

        // Cursor moves to Ping button
        await controlsCursor.start({ opacity: 0.7, y: 55, x: 260, transition: { duration: 0.6 } });
        
        // Tap Ping
        await controlsCursor.start({ scale: 0.7, transition: { duration: 0.1 } });
        await controlsCursor.start({ scale: 1, transition: { duration: 0.1 } });

        // Simulated checkmark feedback
        await new Promise(r => setTimeout(r, 1000));
        
        controlsCursor.start({ opacity: 0 });
        await controlsModal.start({ y: -150, opacity: 0 });
        await controlsFriend.start({ scale: 0, opacity: 0 });
      }
    };
    sequence();
    return () => { isMounted = false; };
  }, [controlsRadar, controlsFriend, controlsModal, controlsCursor]);

  return (
    <div className="w-100 h-100 position-relative overflow-hidden" style={{ background: '#1a1b26' }}>
      <div className="map-roads" style={{ opacity: 0.1, filter: 'invert(1)' }}></div>
      
      {/* You Pin */}
      <div className="marker-you" style={{ left: 150, top: 350, zIndex: 10 }}>
        <img src={testimonial1} alt="Profile" className="marker-profile" style={{ width: 24, height: 24 }} />
        <motion.div 
          animate={controlsRadar}
          style={{ position: 'absolute', width: 60, height: 60, borderRadius: '50%', background: '#40c057', zIndex: -1 }}
        />
      </div>

      {/* Friend Pin */}
      <motion.div animate={controlsFriend} className="marker-you" style={{ left: 220, top: 180, background: 'rgba(250,8,8,0.2)', zIndex: 10 }}>
        <img src={avatar3} alt="Friend" className="marker-profile" style={{ width: 24, height: 24 }} />
        <div className="marker-you-dot" style={{ background: '#FA0808' }}></div>
      </motion.div>

      {/* Notification Modal */}
      <motion.div animate={controlsModal} className="position-absolute" style={{ top: 0, left: 15, right: 15, background: 'white', borderRadius: 16, padding: 15, zIndex: 50, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
        <div className="d-flex align-items-center gap-3">
          <img src={avatar3} alt="Friend" style={{ width: 40, height: 40, borderRadius: '50%' }} />
          <div className="flex-grow-1">
            <div className="fw-bold" style={{ fontSize: 14 }}>David</div>
            <div className="text-muted" style={{ fontSize: 12 }}>2 mins away</div>
          </div>
          <div className="bg-danger text-white px-3 py-1 rounded-pill fw-bold" style={{ fontSize: 12 }}>Ping</div>
        </div>
      </motion.div>

      {/* Touch Cursor */}
      <motion.div className="touch-cursor" animate={controlsCursor} style={{ zIndex: 100 }}></motion.div>
    </div>
  );
}
