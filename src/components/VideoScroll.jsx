import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoScroll = () => {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !hasStarted) {
        setHasStarted(true);
        if (videoRef.current) {
          videoRef.current.play().catch(err => console.error("Playback failed:", err));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasStarted]);

  return (
    <div style={{ minHeight: '100vh', background: '#000', position: 'relative' }}>
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100vh', 
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <video
          ref={videoRef}
          src="/assets/sec.mp4"
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 40%, rgba(0,0,0,0.8) 90%)',
          pointerEvents: 'none'
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence>
            {!hasStarted && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ textAlign: 'center' }}
              >
                <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: 1, marginBottom: '20px' }}>
                  MISSION <br /> <span className="gradient-text">PHASE 2</span>
                </h1>
                <div style={{ color: 'var(--mars-red)', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '4px' }}>
                  SCROLL TO VIEW ORBIT
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section style={{ height: '300vh' }} />
      </div>
    </div>
  );
};

export default VideoScroll;
