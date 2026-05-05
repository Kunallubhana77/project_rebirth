import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [activeSection, setActiveSection] = React.useState('home');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        root: document.querySelector('.scroll-container'),
        threshold: 0.3 
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <motion.nav 
      initial={{ y: 100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        position: 'fixed',
        bottom: '30px', 
        left: '50%',
        display: 'flex',
        alignItems: 'center',
        zIndex: 2500, 
        gap: '20px',
        width: 'auto',
        maxWidth: '95vw',
        justifyContent: 'center',
        padding: '12px 30px',
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(30px)',
        borderRadius: '100px',
        border: '1px solid rgba(255, 102, 0, 0.3)',
        boxShadow: '0 15px 50px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(255, 102, 0, 0.1)',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
      className="no-scrollbar"
    >
      {[
        { label: 'HOME', id: 'home' },
        { label: 'MESSAGES', id: 'signal' }
      ].map((item) => {
        const isActive = item.id === 'home' 
          ? (activeSection === 'home' || activeSection.startsWith('scene-'))
          : activeSection === 'signal';
        return (
          <motion.a 
            key={item.id}
            href={`#${item.id}`}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              padding: '10px 25px', 
              fontSize: '0.7rem', 
              fontWeight: 800, 
              color: isActive ? '#ff6600' : '#fff', 
              background: isActive ? 'rgba(255, 102, 0, 0.1)' : 'transparent', 
              borderRadius: '40px',
              border: isActive ? '1px solid rgba(255, 102, 0, 0.3)' : '1px solid transparent',
              transition: 'all 0.3s ease',
              letterSpacing: '3px',
              textDecoration: 'none',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {item.label}
          </motion.a>
        );
      })}
    </motion.nav>
  );
};

export default Navbar;
