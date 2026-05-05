import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h4 style={{ color: 'var(--mars-red)', marginBottom: '10px' }}>RED PLANET EXPLORATION</h4>
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: 1, marginBottom: '20px' }}>
            THE NEXT <br /> <span className="gradient-text">FRONTIER</span>
          </h1>
          <p style={{ maxWidth: '500px', color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.1rem' }}>
            Unveiling the mysteries of the Red Planet. From ancient riverbeds to the highest peaks in the solar system, Mars awaits its next explorers.
          </p>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <button className="glass-panel" style={{ padding: '15px 30px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
              DISCOVER MORE
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div style={{ width: '40px', height: '1px', background: 'var(--text-secondary)' }}></div>
              SCROLL TO EXPLORE
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
