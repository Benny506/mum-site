import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import testimonial1 from "../../assets/images/testimonial1.png";
import testimonial2 from "../../assets/images/testimonial2.png";
import testimonial3 from "../../assets/images/testimonial3.png";
import avatar3 from "../../assets/images/generated/avatar_3_1782649686002.png";

const initialLeaderboard = [
  { id: '1', name: 'Sarah Jenkins', points: 12450, img: testimonial2, isYou: false },
  { id: '2', name: 'Alicia James', points: 10200, img: testimonial1, isYou: false },
  { id: '3', name: 'David O.', points: 9800, img: testimonial3, isYou: false },
  { id: 'you', name: 'You', points: 9500, img: avatar3, isYou: true },
];

export default function HowItWorks() {
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [addedPoints, setAddedPoints] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const sequence = async () => {
      while (isMounted) {
        // Reset
        setLeaderboard(initialLeaderboard);
        setAddedPoints(false);
        await new Promise(r => setTimeout(r, 2000));
        if (!isMounted) break;

        // Add points
        setAddedPoints(true);
        const newBoard1 = [...initialLeaderboard];
        newBoard1[3] = { ...newBoard1[3], points: 10500 };
        setLeaderboard(newBoard1);

        await new Promise(r => setTimeout(r, 1000));
        if (!isMounted) break;

        // Reorder (You jump to 2nd place)
        const newBoard2 = [
          newBoard1[0],
          newBoard1[3], // You leapfrog 2 and 3
          newBoard1[1],
          newBoard1[2]
        ];
        setLeaderboard(newBoard2);
        setAddedPoints(false);

        await new Promise(r => setTimeout(r, 4000));
      }
    };
    sequence();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="spacing-50 my-5 py-5 position-relative overflow-hidden" style={{ background: '#fcfcfc', borderTop: '1px solid #f1f1f1', borderBottom: '1px solid #f1f1f1' }}>
      
      {/* Abstract Edge Shape */}
      <div className="position-absolute d-none d-lg-block" style={{ left: 0, top: '20%', width: 100, height: 400, background: '#ce1010', borderTopRightRadius: 200, borderBottomRightRadius: 200, opacity: 0.05 }}></div>

      <div className="row align-items-center w-100 px-4 px-md-5 m-0 position-relative" style={{ zIndex: 1 }}>
        
        {/* Left Side: Text */}
        <div className="col-12 col-lg-5 text-start mb-5 mb-lg-0">
          <div className="text-danger text-tiny fw-bold mb-2" style={{ letterSpacing: 1 }}>COMPETITIONS & REWARDS</div>
          <div className="section-title mb-3">Refer, Climb, and Win Big.</div>
          <div className="section-desc opacity-75 mb-5" style={{ maxWidth: 500 }}>
            We're giving away exclusive prizes, cash, and merchandise to our top referrers. Share Unimap, climb the leaderboard, and secure your spot at the top.
          </div>
          
          <div className="d-flex flex-column gap-4">
            <div className="d-flex gap-3">
              <div className="d-flex flex-column align-items-center">
                <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: 40, height: 40 }}>1</div>
                <div style={{ width: 2, height: 50, background: '#f1f1f1', marginTop: 10 }}></div>
              </div>
              <div>
                <div className="card-title">Share your unique link</div>
                <div className="card-desc mt-1" style={{ maxWidth: 300 }}>Get your friends on board with a single tap.</div>
              </div>
            </div>

            <div className="d-flex gap-3">
              <div className="d-flex flex-column align-items-center">
                <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: 40, height: 40 }}>2</div>
                <div style={{ width: 2, height: 50, background: '#f1f1f1', marginTop: 10 }}></div>
              </div>
              <div>
                <div className="card-title">Earn Points</div>
                <div className="card-desc mt-1" style={{ maxWidth: 300 }}>Rack up points for every verified sign-up.</div>
              </div>
            </div>

            <div className="d-flex gap-3">
              <div className="d-flex flex-column align-items-center">
                <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: 40, height: 40 }}>3</div>
              </div>
              <div>
                <div className="card-title">Win Prizes</div>
                <div className="card-desc mt-1" style={{ maxWidth: 300 }}>Cash out or claim exclusive campus rewards.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Leaderboard UI */}
        <div className="col-12 col-lg-6 offset-lg-1 d-flex justify-content-center">
           <div className="bg-white rounded-4 p-4 shadow-lg w-100 position-relative" style={{ maxWidth: 450, border: '1px solid #f1f1f1' }}>
             
             {/* Golden Ambient Glow */}
             <div className="position-absolute rounded-circle" style={{ width: 300, height: 300, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0, opacity: 0.3 }}></div>

              <div className="d-flex justify-content-between align-items-center mb-4 position-relative" style={{ zIndex: 1 }}>
               <div className="card-title">Campus Top 10</div>
               <div className="text-danger text-tiny bg-light px-3 py-1 rounded-pill border">Ends in 2 days</div>
             </div>

             <div className="d-flex flex-column gap-3 position-relative" style={{ zIndex: 1 }}>
               {leaderboard.map((user, index) => {
                 let Medal = null;
                 if (index === 0) Medal = <FaTrophy color="#FFD700" size={20} />;
                 else if (index === 1) Medal = <FaMedal color="#C0C0C0" size={24} />;
                 else if (index === 2) Medal = <FaMedal color="#CD7F32" size={24} />;
                 else Medal = <div className="fw-bold text-muted text-center" style={{ width: 24 }}>{index + 1}</div>;

                 return (
                   <motion.div 
                     layout
                     key={user.id}
                     transition={{ type: "spring", stiffness: 300, damping: 25 }}
                     className={`d-flex align-items-center p-3 rounded-3 ${user.isYou ? 'shadow' : ''}`}
                     style={{ border: user.isYou ? '2px solid #ce1010' : '1px solid #f1f1f1', background: user.isYou ? '#fff9f9' : '#fff' }}
                   >
                     <div className="me-3 d-flex justify-content-center" style={{ width: 30 }}>{Medal}</div>
                     <img src={user.img} alt={user.name} style={{ width: 45, height: 45, borderRadius: '50%', objectFit: 'cover' }} />
                     <div className="ms-3 flex-grow-1">
                       <div className="text-body fw-600">{user.name}</div>
                     </div>
                     <div className="text-end position-relative">
                       <div className={`text-body fw-bold ${user.isYou ? 'text-danger' : ''}`}>{user.points.toLocaleString()} pts</div>
                       {/* Animated points bump */}
                       <AnimatePresence>
                         {user.isYou && addedPoints && (
                           <motion.div 
                             initial={{ opacity: 0, y: 10, scale: 0.8 }}
                             animate={{ opacity: 1, y: -25, scale: 1.2 }}
                             exit={{ opacity: 0, y: -40 }}
                             className="position-absolute text-success fw-bold"
                             style={{ right: 0, top: 0, whiteSpace: 'nowrap' }}
                           >
                             +1,000 pts!
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </div>
                   </motion.div>
                 );
               })}
             </div>
             
           </div>
        </div>

      </div>
    </div>
  );
}