import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import '../../InteractivePhone/InteractivePhone.css';
import unCover from '../../../assets/images/uncover.svg';

export default function ScheduleScreen() {
  const controlsCursor = useAnimation();
  const controlsDateModal = useAnimation();
  const controlsReminderModal = useAnimation();
  const controlsLocModal = useAnimation();
  const controlsLocCard = useAnimation();
  
  const [typedTitle, setTypedTitle] = useState("");
  const [hasReminder, setHasReminder] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const sequence = async () => {
      while (isMounted) {
        // Reset
        await controlsCursor.set({ x: 170, y: 650, scale: 1, opacity: 0 });
        setTypedTitle("");
        setHasReminder(false);
        await controlsDateModal.set({ y: "100%" });
        await controlsReminderModal.set({ y: "100%" });
        await controlsLocModal.set({ y: "100%" });
        await controlsLocCard.set({ opacity: 0, scale: 0.9, display: 'none' });

        await new Promise(r => setTimeout(r, 500));
        if (!isMounted) break;

        // Move cursor to title
        await controlsCursor.start({ x: 80, y: 150, opacity: 0.7, transition: { duration: 0.6 } });
        await controlsCursor.start({ scale: 0.7, transition: { duration: 0.1 } });
        await controlsCursor.start({ scale: 1, transition: { duration: 0.1 } });

        // Simulate typing
        const text = "My schedule";
        for (let i = 0; i <= text.length; i++) {
          if (!isMounted) break;
          setTypedTitle(text.slice(0, i));
          await new Promise(r => setTimeout(r, 50));
        }

        await new Promise(r => setTimeout(r, 300));
        if (!isMounted) break;

        // Move to Reminder Date
        await controlsCursor.start({ x: 80, y: 220, transition: { duration: 0.5 } });
        await controlsCursor.start({ scale: 0.7, transition: { duration: 0.1 } });
        await controlsCursor.start({ scale: 1, transition: { duration: 0.1 } });

        // Show Date Modal
        await controlsDateModal.start({ y: "0%", transition: { type: "spring", stiffness: 300, damping: 30 } });
        await new Promise(r => setTimeout(r, 300));
        
        // Tap confirm
        await controlsCursor.start({ x: 250, y: 600, transition: { duration: 0.4 } });
        await controlsCursor.start({ scale: 0.7, transition: { duration: 0.1 } });
        await controlsCursor.start({ scale: 1, transition: { duration: 0.1 } });
        await controlsDateModal.start({ y: "100%", transition: { duration: 0.3 } });

        // Move to Add Reminder
        await controlsCursor.start({ x: 160, y: 310, transition: { duration: 0.5 } });
        await controlsCursor.start({ scale: 0.7, transition: { duration: 0.1 } });
        await controlsCursor.start({ scale: 1, transition: { duration: 0.1 } });

        // Show Reminder Modal
        await controlsReminderModal.start({ y: "0%", transition: { type: "spring", stiffness: 300, damping: 30 } });
        await new Promise(r => setTimeout(r, 300));

        // Tap 5m before
        await controlsCursor.start({ x: 170, y: 550, transition: { duration: 0.4 } });
        await controlsCursor.start({ scale: 0.7, transition: { duration: 0.1 } });
        await controlsCursor.start({ scale: 1, transition: { duration: 0.1 } });
        setHasReminder(true);
        await controlsReminderModal.start({ y: "100%", transition: { duration: 0.3 } });

        // Move to Add Location
        await controlsCursor.start({ x: 170, y: 400, transition: { duration: 0.5 } });
        await controlsCursor.start({ scale: 0.7, transition: { duration: 0.1 } });
        await controlsCursor.start({ scale: 1, transition: { duration: 0.1 } });

        // Show Location Modal
        await controlsLocModal.start({ y: "0%", transition: { type: "spring", stiffness: 300, damping: 30 } });
        await new Promise(r => setTimeout(r, 300));

        // Tap Open PAV
        await controlsCursor.start({ x: 170, y: 480, transition: { duration: 0.4 } });
        await controlsCursor.start({ scale: 0.7, transition: { duration: 0.1 } });
        await controlsCursor.start({ scale: 1, transition: { duration: 0.1 } });
        await controlsLocModal.start({ y: "100%", transition: { duration: 0.3 } });

        // Show Loc Card
        await controlsLocCard.set({ display: 'block' });
        await controlsLocCard.start({ opacity: 1, scale: 1, transition: { type: "spring" } });

        // Tap Save
        await controlsCursor.start({ x: 170, y: 640, transition: { duration: 0.5 } });
        await controlsCursor.start({ scale: 0.7, transition: { duration: 0.1 } });
        await controlsCursor.start({ scale: 1, transition: { duration: 0.1 } });

        await new Promise(r => setTimeout(r, 1000));
        controlsCursor.start({ opacity: 0 });
      }
    };
    sequence();
    return () => { isMounted = false; };
  }, [controlsCursor, controlsDateModal, controlsReminderModal, controlsLocModal, controlsLocCard]);

  return (
    <div className="w-100 h-100 position-relative" style={{ background: '#f5f5f5', overflow: 'hidden' }}>
      
      {/* Header */}
      <div className="bg-white px-3 py-4 border-bottom" style={{ paddingTop: 50 }}>
        <div className="fw-bold" style={{ fontSize: 24, marginTop: 10 }}>Add Schedule</div>
      </div>

      <div className="p-3">
        {/* Title Input */}
        <div className="bg-white p-3 rounded mb-3" style={{ border: '1px solid #eee' }}>
          <div className="text-muted" style={{ fontSize: 12 }}>Title</div>
          <div style={{ fontSize: 16, height: 24 }}>{typedTitle}<span className="blink-cursor">|</span></div>
        </div>

        {/* Date Picker trigger */}
        <div className="bg-white p-3 rounded mb-3" style={{ border: '1px solid #eee' }}>
          <div className="text-muted" style={{ fontSize: 12 }}>Remind before:</div>
          <div className="fw-bold" style={{ fontSize: 14 }}>Sun, 28 Jun <span className="float-end">2:01 pm</span></div>
        </div>

        {/* Reminders */}
        <div className="mb-3">
          <div className="fw-bold mb-2" style={{ fontSize: 14 }}>Reminders</div>
          <div className="d-flex gap-2 align-items-center">
            <div className="bg-danger text-white rounded-pill px-2 py-1" style={{ fontSize: 12 }}>10m before</div>
            {hasReminder && <div className="bg-danger text-white rounded-pill px-2 py-1" style={{ fontSize: 12 }}>5m before</div>}
            <div className="border rounded-pill px-2 py-1 text-danger border-danger" style={{ fontSize: 12 }}>+ Add</div>
          </div>
        </div>

        {/* Add Location */}
        <div className="bg-white p-3 rounded mb-3 d-flex align-items-center gap-2" style={{ border: '1px solid #eee' }}>
          <div className="border rounded d-flex justify-content-center align-items-center text-muted" style={{ width: 24, height: 24 }}>+</div>
          <div className="fw-bold" style={{ fontSize: 14 }}>Add Location</div>
        </div>

        {/* Location Card Preview */}
        <motion.div animate={controlsLocCard} className="bg-white rounded overflow-hidden" style={{ border: '1px solid #eee' }}>
          <div className="bg-secondary text-white p-2 text-center" style={{ fontSize: 12 }}>Where you are going: Open PAV</div>
          <div style={{ height: 100, background: '#ccc', backgroundImage: `url(${unCover})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </motion.div>
      </div>

      {/* Save Button */}
      <div className="position-absolute bottom-0 w-100 p-3 bg-white border-top">
        <div className="bg-danger text-white text-center py-2 rounded fw-bold">Save</div>
      </div>

      {/* Date Modal */}
      <motion.div animate={controlsDateModal} className="position-absolute bottom-0 w-100 bg-white" style={{ height: 300, borderTopLeftRadius: 20, borderTopRightRadius: 20, zIndex: 50, boxShadow: '0 -5px 15px rgba(0,0,0,0.1)' }}>
        <div className="text-center p-3 fw-bold border-bottom">Select Date & Time</div>
        <div className="p-3 text-center text-muted h-50 d-flex flex-column justify-content-center">
           <div className="border-bottom py-2">June 27 &nbsp;&nbsp;&nbsp; 1:00 pm</div>
           <div className="fw-bold py-2 fs-5">June 28 &nbsp;&nbsp;&nbsp; 2:01 pm</div>
           <div className="border-top py-2">June 29 &nbsp;&nbsp;&nbsp; 3:00 pm</div>
        </div>
        <div className="position-absolute bottom-0 w-100 p-3">
          <div className="bg-danger text-white text-center py-2 rounded fw-bold">Confirm</div>
        </div>
      </motion.div>

      {/* Reminder Modal */}
      <motion.div animate={controlsReminderModal} className="position-absolute bottom-0 w-100 bg-white" style={{ height: 200, borderTopLeftRadius: 20, borderTopRightRadius: 20, zIndex: 50, boxShadow: '0 -5px 15px rgba(0,0,0,0.1)' }}>
        <div className="p-3 d-flex gap-4">
           <div className="text-center w-50">Cancel</div>
           <div className="text-center w-50 fw-bold">Add</div>
        </div>
        <div className="text-center py-2 text-muted">10m before</div>
        <div className="text-center py-2 fw-bold bg-light">5m before</div>
        <div className="text-center py-2 text-muted">15m before</div>
      </motion.div>

      {/* Location Modal */}
      <motion.div animate={controlsLocModal} className="position-absolute bottom-0 w-100 bg-white" style={{ height: 400, borderTopLeftRadius: 20, borderTopRightRadius: 20, zIndex: 50, boxShadow: '0 -5px 15px rgba(0,0,0,0.1)' }}>
        <div className="p-3 border-bottom text-muted">Where to?</div>
        <div className="p-3 border-bottom">Another Test Location</div>
        <div className="p-3 border-bottom">Old Bursary</div>
        <div className="p-3 border-bottom fw-bold bg-light">Open PAV</div>
        <div className="p-3 border-bottom">Edu Auditorium</div>
      </motion.div>

      {/* Touch Cursor */}
      <motion.div className="touch-cursor" animate={controlsCursor} style={{ zIndex: 100 }}></motion.div>
    </div>
  );
}
