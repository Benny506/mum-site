import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MdLocationOn } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa';
import { FiMapPin, FiMail, FiCalendar, FiBook, FiVolume2 } from 'react-icons/fi';
import Lottie from 'lottie-react';
import './AboutCards.css';

// Import generated avatars for FreshersCard
import avatar1 from '../../assets/images/generated/avatar_1_1782649667767.png';
import avatar2 from '../../assets/images/generated/avatar_2_1782649675697.png';
import avatar3 from '../../assets/images/generated/avatar_3_1782649686002.png';

// Import Lotties
import mapSearchAnimation from '../../assets/lotties/map search.json';
import walkAndTypeAnimation from '../../assets/lotties/walk and type.json';

export function FreshersCard() {
  const avatars = [avatar1, avatar2, avatar3, avatar1];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div ref={ref} style={{ y }} className="about-card freshers-card overflow-hidden position-relative">
      <div className="p-4 p-md-5 position-relative z-2">
        <h3 className="text-white card-title mb-3">For Freshers</h3>
        <p className="text-white opacity-75 card-desc pe-lg-4">
          You don’t even know where the restroom is — a simple problem that makes campus life harder than it should be.
        </p>
      </div>

      {/* Grid Lines */}
      <motion.div
        className="freshers-grid"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />

      {/* Orbiting Avatars & Pin */}
      <div className="freshers-center">
        <div className="pulse-ring" />
        <div className="pulse-ring delay" />
        
        <div className="center-pin">
          <MdLocationOn size={45} color="#FA0808" />
        </div>

        <motion.div
          className="orbit-container"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {avatars.map((img, i) => (
            <div className={`orbit-avatar orbit-pos-${i}`} key={i}>
              <motion.img
                src={img}
                alt="Avatar"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ReturningCard() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Parallax effects
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.div ref={ref} className="about-card returning-card overflow-hidden position-relative">
      <motion.div className="returning-grid-bg" style={{ y: gridY }} />

      <div className="row h-100 position-relative z-2 align-items-center">
        <div className="col-12 col-md-7 p-4 p-md-5">
          <h3 className="text-white card-title mb-3">For Returning Students</h3>
          <p className="text-white opacity-75 card-desc">
            You only know your daily route — office, lecture hall, cafeteria, repeat — and the rest of campus stays invisible.
          </p>
        </div>

        <div className="col-12 col-md-5 d-flex justify-content-center align-items-center position-relative mt-4 mt-md-0 pb-4 pb-md-0">
          <Lottie
            animationData={walkAndTypeAnimation}
            loop={true}
            style={{ width: '90%', maxWidth: '300px', height: 'auto', zIndex: 10 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function VisitorsCard() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const waveY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div ref={ref} className="about-card visitors-card overflow-hidden position-relative d-flex align-items-center justify-content-center py-5">
      <motion.div className="visitors-wave" style={{ y: waveY }} />
      
      {/* Animated Navigation Routes Background */}
      <svg className="position-absolute w-100 h-100" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" style={{ top: 0, left: 0, pointerEvents: 'none', opacity: 0.4, zIndex: 1 }}>
         <motion.path 
           d="M -100,100 Q 250,-50 500,100 T 1100,100"
           fill="transparent"
           stroke="#FA0808"
           strokeWidth="4"
           strokeDasharray="15 15"
           animate={{ strokeDashoffset: [0, -60] }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
         />
         <motion.path 
           d="M -100,300 Q 250,450 500,300 T 1100,300"
           fill="transparent"
           stroke="#228be6"
           strokeWidth="4"
           strokeDasharray="15 15"
           animate={{ strokeDashoffset: [0, 60] }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
         />
      </svg>

      <div className="position-relative z-2 p-4 p-md-5 text-center" style={{ maxWidth: '800px' }}>
        <h3 className="card-title mb-4 text-dark">For Visitors & First timers</h3>
        <p className="card-desc text-dark opacity-75">
          Whether it’s your first day or a quick drop-in, skip the awkward wandering and find your way like a student who’s been here all semester.
        </p>
      </div>
    </div>
  );
}

export function CampusCollage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.div ref={ref} style={{ y }} className="w-100 d-flex justify-content-center align-items-center">
      <Lottie
        animationData={mapSearchAnimation}
        loop={true}
        style={{ width: '100%', maxWidth: '450px', height: 'auto' }}
      />
    </motion.div>
  );
}
