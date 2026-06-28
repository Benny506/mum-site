import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import '../../InteractivePhone/InteractivePhone.css';
import testimonial1 from '../../../assets/images/testimonial1.png';

// Import generated images
import imgBaking from '../../../assets/images/generated/business_baking_1782655194503.png';
import imgPrinting from '../../../assets/images/generated/business_printing_1782655204585.png';
import imgFood from '../../../assets/images/generated/business_food_1782655216654.png';
import imgClothing from '../../../assets/images/generated/business_clothing_1782655225587.png';
import imgPerfume from '../../../assets/images/generated/business_perfume_1782655237157.png';

export default function BusinessScreen() {
  const controlsCursor = useAnimation();
  const controlsScreen = useAnimation();
  const controlsDiscoverScroll = useAnimation();
  const controlsProfileScroll = useAnimation();

  useEffect(() => {
    let isMounted = true;
    const sequence = async () => {
      while (isMounted) {
        // Reset everything
        await controlsCursor.set({ x: 170, y: 650, scale: 1, opacity: 0 });
        await controlsScreen.set({ x: 0 });
        await controlsDiscoverScroll.set({ y: 0 });
        await controlsProfileScroll.set({ y: 0 });

        await new Promise(r => setTimeout(r, 800));
        if (!isMounted) break;

        // 1. Move cursor to bottom of discover screen to start scroll
        await controlsCursor.start({ x: 170, y: 500, opacity: 0.7, transition: { duration: 0.8 } });
        
        // 2. Drag cursor UP while scrolling content UP (simulating swipe)
        await controlsCursor.start({ scale: 0.8, transition: { duration: 0.1 } });
        
        // Parallel animation: cursor moves up to 200, content scrolls up by -600
        controlsCursor.start({ y: 200, transition: { duration: 1.5, ease: "easeOut" } });
        await controlsDiscoverScroll.start({ y: -580, transition: { duration: 1.5, ease: "easeOut" } });

        await controlsCursor.start({ scale: 1, transition: { duration: 0.1 } });

        await new Promise(r => setTimeout(r, 400));
        if (!isMounted) break;

        // 3. Move cursor to tap the last business (Lumina Fragrances)
        await controlsCursor.start({ x: 170, y: 480, transition: { duration: 0.5 } });
        await controlsCursor.start({ scale: 0.7, transition: { duration: 0.1 } });
        await controlsCursor.start({ scale: 1, transition: { duration: 0.1 } });

        // 4. Transition to Profile Page (Slide left)
        controlsScreen.start({ x: -340, transition: { type: "spring", stiffness: 300, damping: 30 } });
        
        await new Promise(r => setTimeout(r, 800));
        if (!isMounted) break;

        // 5. Scroll down profile page
        // Move cursor to bottom
        await controlsCursor.start({ y: 550, transition: { duration: 0.5 } });
        // Cursor drag up
        await controlsCursor.start({ scale: 0.8, transition: { duration: 0.1 } });
        controlsCursor.start({ y: 150, transition: { duration: 1.5, ease: "easeOut" } });
        await controlsProfileScroll.start({ y: -350, transition: { duration: 1.5, ease: "easeOut" } });
        
        await controlsCursor.start({ scale: 1, opacity: 0, transition: { duration: 0.1 } });

        await new Promise(r => setTimeout(r, 2000));
      }
    };
    sequence();
    return () => { isMounted = false; };
  }, [controlsCursor, controlsScreen, controlsDiscoverScroll, controlsProfileScroll]);

  const BusinessCard = ({ img, name, category, delay }) => (
    <div className="bg-white rounded overflow-hidden shadow-sm mb-4" style={{ border: '1px solid #eee' }}>
      <div style={{ height: 120, backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="p-3 position-relative">
        <div style={{ position: 'absolute', top: -25, left: 15, width: 50, height: 50, borderRadius: '50%', background: '#fff', padding: 2, border: '1px solid #eee' }}>
          <img src={img} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="Logo" />
        </div>
        <div className="fw-bold mt-3">{name}</div>
        <div className="bg-danger text-white rounded-pill px-2 py-1 mt-1 d-inline-block" style={{ fontSize: 10 }}>{category}</div>
      </div>
    </div>
  );

  return (
    <div className="w-100 h-100 position-relative overflow-hidden" style={{ background: '#f5f5f5' }}>
      
      {/* Sliding Container holding both screens side-by-side */}
      <motion.div animate={controlsScreen} className="d-flex h-100" style={{ width: '680px' }}>
        
        {/* Screen 1: Discover Page */}
        <div style={{ width: '340px', height: '100%', padding: 15, position: 'relative' }}>
          <div className="fw-bold mb-3" style={{ fontSize: 24, marginTop: 40 }}>Discover</div>
          <div className="bg-white rounded p-2 mb-3 text-muted shadow-sm" style={{ border: '1px solid #ddd' }}>
            <span style={{ fontSize: 14 }}>Search businesses...</span>
          </div>
          
          <motion.div animate={controlsDiscoverScroll} style={{ paddingBottom: 150 }}>
            <BusinessCard img={imgBaking} name="Sweet Crumbs Bakery" category="Food & Drink" />
            <BusinessCard img={imgPrinting} name="Spectrum Prints" category="Services" />
            <BusinessCard img={imgFood} name="Jollof King" category="Food & Drink" />
            <BusinessCard img={imgClothing} name="Urban Style Boutique" category="Fashion" />
            
            {/* The 5th target card */}
            <div className="bg-white rounded overflow-hidden shadow-sm mb-4 position-relative" style={{ border: '2px solid #ce1010' }}>
              <div style={{ height: 120, backgroundImage: `url(${imgPerfume})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="p-3 position-relative">
                <div style={{ position: 'absolute', top: -25, left: 15, width: 50, height: 50, borderRadius: '50%', background: '#fff', padding: 2, border: '1px solid #eee' }}>
                  <img src={imgPerfume} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="Logo" />
                </div>
                <div className="fw-bold mt-3" style={{ fontSize: 18 }}>Lumina Fragrances</div>
                <div className="bg-danger text-white rounded-pill px-2 py-1 mt-1 d-inline-block" style={{ fontSize: 10 }}>Health & Beauty</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Screen 2: Business Profile Page (Lumina Fragrances) */}
        <div style={{ width: '340px', height: '100%', background: '#fff' }}>
          <motion.div animate={controlsProfileScroll} className="w-100" style={{ paddingBottom: 100 }}>
            
            {/* Header Image */}
            <div style={{ height: 200, backgroundImage: `url(${imgPerfume})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)', width: 80, height: 80, borderRadius: '50%', background: '#fff', padding: 4, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <img src={imgPerfume} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="Logo" />
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="text-center px-3" style={{ marginTop: 50 }}>
              <div className="fw-bold fs-4">Lumina Fragrances</div>
              <div className="bg-danger text-white rounded-pill px-2 py-1 mx-auto mt-2 mb-3 shadow-sm" style={{ width: 'fit-content', fontSize: 12 }}>Health & Beauty</div>
              
              <div className="d-flex gap-2 justify-content-center flex-wrap mb-4">
                <div className="border rounded-pill px-3 py-1 bg-light" style={{ fontSize: 12 }}>Perfumes</div>
                <div className="border rounded-pill px-3 py-1 bg-light" style={{ fontSize: 12 }}>Luxury</div>
                <div className="border rounded-pill px-3 py-1 bg-light" style={{ fontSize: 12 }}>Gift Sets</div>
              </div>

              <div className="border rounded p-3 text-start mb-4 bg-light text-muted" style={{ fontSize: 13, fontStyle: 'italic' }}>
                "Discover your signature scent. We curate the finest luxury perfumes and bespoke fragrances for students who want to leave a lasting impression."
              </div>
            </div>

            {/* Meet the Owner */}
            <div className="px-3 mb-4">
              <div className="fw-bold mb-3" style={{ fontSize: 15 }}>Meet the Owner</div>
              <div className="border rounded p-3 d-flex align-items-center gap-3 shadow-sm bg-white">
                <img src={testimonial1} style={{ width: 45, height: 45, borderRadius: '50%', objectFit: 'cover' }} alt="Owner" />
                <div>
                  <div className="fw-bold">Sarah Jenkins</div>
                  <div className="text-muted" style={{ fontSize: 12 }}>@sarah_scents</div>
                </div>
                <div className="ms-auto bg-dark text-white rounded-pill px-3 py-1" style={{ fontSize: 11 }}>Message</div>
              </div>
            </div>

            {/* Offerings & Catalogs */}
            <div className="px-3 pb-5">
              <div className="fw-bold mb-3" style={{ fontSize: 15 }}>Offerings & Catalogs</div>
              
              <div className="border rounded shadow-sm mb-3 overflow-hidden bg-white">
                <div style={{ height: 120, backgroundImage: `url(${imgPerfume})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="p-3 d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-bold">Signature Scents</div>
                    <div className="text-muted" style={{ fontSize: 12 }}>Our best-selling collection</div>
                  </div>
                  <div className="fw-bold text-danger">₦15,000</div>
                </div>
              </div>

              <div className="border rounded shadow-sm mb-3 overflow-hidden bg-white">
                <div className="p-3 d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-bold">Oud Collection</div>
                    <div className="text-muted" style={{ fontSize: 12 }}>Rich, woody evening fragrances</div>
                  </div>
                  <div className="fw-bold text-danger">₦25,000</div>
                </div>
              </div>

              <div className="border rounded shadow-sm mb-5 overflow-hidden bg-white">
                <div className="p-3 d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-bold">Custom Gift Sets</div>
                    <div className="text-muted" style={{ fontSize: 12 }}>Perfect for birthdays</div>
                  </div>
                  <div className="fw-bold text-danger">From ₦10k</div>
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      </motion.div>

      {/* Touch Cursor */}
      <motion.div className="touch-cursor" animate={controlsCursor} style={{ zIndex: 100 }}></motion.div>
    </div>
  );
}
