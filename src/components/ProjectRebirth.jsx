import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarsCanvas from './MarsCanvas';
import Typewriter from './Typewriter';

const ambientSound = '/assets/Z.mp3';
const firstClip = 'https://res.cloudinary.com/dljrnb9ef/video/upload/v1778000614/first_mxaena.mp4';
const invasionClip = 'https://res.cloudinary.com/dljrnb9ef/video/upload/v1778000584/day_jwprlf.mp4';
const secClip = 'https://res.cloudinary.com/dljrnb9ef/video/upload/v1778000566/sec_ojc3cq.mp4';
const landingClip = 'https://res.cloudinary.com/dljrnb9ef/video/upload/v1778000612/3_nqhg8i.mp4';
const alienVoice = '/assets/Alien.mp3';

const fullscreenSectionStyle = {
  height: '100dvh',
  minHeight: '100dvh',
  width: '100vw',
  margin: 0,
  padding: 0,
  position: 'relative',
  overflow: 'hidden'
};

const fullscreenVideoStyle = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transform: 'scale(1.8)',
  zIndex: 0,
  opacity: 1
};

const LazyVideo = ({ src, style, className, muted = true }) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted={muted}
      loop
      playsInline
      preload="auto"
      style={style}
      src={src}
    />
  );
};

const ProjectRebirth = () => {
  const [loading, setLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isAlienMuted, setIsAlienMuted] = useState(false);
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [feedMessages, setFeedMessages] = useState([
    { id: "LOG_882", text: "If you hear this... tell Sarah I waited as long as I could. The air is getting thin.", sender: "ARCHER_V" },
    { id: "LOG_901", text: "The blue marble is gone. It's just gray now. We're all that's left.", sender: "CMDR_HAYES" },
    { id: "LOG_942", text: "Is anyone still out there? My daughter is scared. We just need to know we aren't alone.", sender: "CITIZEN_001" },
    { id: "LOG_955", text: "To the Rebirth team: Thank you for trying. We see the stars now. They're beautiful.", sender: "STATION_9" }
  ]);
  const charLimit = 280;
  const isOverLimit = message.length > charLimit;
  
  const audioRef = useRef(null);
  const alienAudioRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [, setLogs] = useState([]);

  useEffect(() => {
    if (!hasStarted || loading) return;
    const spawnNotification = () => {
      const id = Date.now();
      const alerts = ["NEW_SIGNAL_INTERCEPTED", "ENCRYPTED_DATA_RECEIVED", "INCOMING_TRANSMISSION", "DISTRESS_BEACON_DETECTED"];
      const alert = alerts[Math.floor(Math.random() * alerts.length)];
      setNotifications(prev => [...prev, { id, text: alert }]);
      setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
      setTimeout(spawnNotification, Math.random() * 10000 + 10000);
    };
    const initialTimeout = setTimeout(spawnNotification, 8000);
    return () => clearTimeout(initialTimeout);
  }, [hasStarted, loading]);

  const startTerminal = () => {
    setHasStarted(true);
  };

  const enterHome = () => {
    let interval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 30);
  };

  useEffect(() => {
    if (!loading) {
      if (audioRef.current) {
        audioRef.current.volume = 0.8;
        audioRef.current.muted = isMuted;
        if (!isMuted) audioRef.current.play().catch(() => {});
      }
      if (alienAudioRef.current) {
        alienAudioRef.current.volume = 0.9;
        alienAudioRef.current.muted = isAlienMuted;
        if (!isAlienMuted) alienAudioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted, isAlienMuted, loading]);

  const toggleAudio = () => setIsMuted(!isMuted);
  const toggleAlienAudio = () => setIsAlienMuted(!isAlienMuted);

  const [stats] = useState({
    oxygen: 84,
    energy: 92,
    embryos: 5000,
    population: 0,
    year: 2098
  });

  const storyScenes = [
    { 
      title: "THE FIRST CONTACT", 
      text: "Our orbital scanners picked up a massive silhouette near the Unknown Sector. It wasn't a meteor. We are still searching for the origin.", 
      video: firstClip 
    },
    { 
      title: "THE INVASION", 
      text: "They descended in silence. Within hours, the forward bases were dark. Search protocols initiated as we fled into the deep void.", 
      video: invasionClip 
    },
    { 
      title: "THE PANIC", 
      text: "Data streams flooded with last messages. We are moving deeper into the dark, chasing a world that isn't on any map.", 
      video: secClip 
    },
    { 
      title: "FINAL ESCAPE", 
      text: "With 'The Swarm' at our heels, we breached the exosphere. The last look at a blue marble turning gray. Our infinite search for a new home begins.", 
      video: landingClip 
    }
  ];

  const addLog = (text) => {
    setLogs(prev => [text, ...prev].slice(0, 5));
  };

  return (
    <>
      <div className="viewport-border" />
      
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ 
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
              background: '#000', zIndex: 10000, display: 'flex', flexDirection: 'column', 
              alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono',
              overflow: 'hidden'
            }}
          >
            {!hasStarted ? (
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ textAlign: 'center' }}>
                <h1 className="boot-screen-text" style={{ color: 'var(--mars-red)', fontSize: 'clamp(1rem, 5vw, 1.2rem)', letterSpacing: '5px', marginBottom: '40px' }}>
                  SYSTEM_STATUS: ENCRYPTED
                </h1>
                <button 
                  onClick={startTerminal}
                  className="btn-primary"
                  style={{ background: 'transparent', color: '#ff6600', border: '2px solid #ff6600', borderRadius: '50px', padding: '20px 60px', fontWeight: 900, cursor: 'pointer' }}
                >
                  BOOT_TERMINAL_
                </button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="loading-dashboard-responsive"
                style={{ 
                  position: 'relative', width: '92vw', maxWidth: '1400px', height: '85vh', 
                  border: '1px solid rgba(255, 102, 0, 0.4)', 
                  background: 'linear-gradient(135deg, rgba(10,10,10,0.95), rgba(0,0,0,1))', 
                  backdropFilter: 'blur(10px)',
                  padding: '40px', gap: '40px', zIndex: 10002,
                  boxShadow: '0 0 50px rgba(0,0,0,1), inset 0 0 100px rgba(255, 102, 0, 0.05)'
                }}
              >
                <div className="hex-bg" />
                <div className="report-side" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: bootProgress > 0 ? 0 : 1, transition: 'opacity 0.5s' }}>
                  <div style={{ fontSize: '0.6rem', color: '#ff6600', marginBottom: '5px', opacity: 0.5 }}>CLASSIFICATION: TOP_SECRET</div>
                  <h1 className="wide-text" style={{ color: 'var(--mars-red)', fontSize: 'clamp(1.2rem, 5vw, 1.8rem)', letterSpacing: '5px', marginBottom: '30px' }}>
                    INTEL_BRIEF
                  </h1>
                  <div className="mono" style={{ color: '#ccc', fontSize: '0.85rem', lineHeight: 2, borderLeft: '3px solid var(--mars-red)', paddingLeft: '30px' }}>
                    <p style={{ color: 'var(--mars-red)', fontWeight: 900, marginBottom: '10px' }}>[THREAT_LEVEL: OMEGA]</p>
                    <p>Hostile entities 'The Swarm' have initiated orbital bombardment. 99% of surface infrastructure destroyed.</p>
                  </div>
                  <button onClick={enterHome} className="btn-primary" style={{ marginTop: '30px', background: '#ff6600', color: 'black', border: 'none', borderRadius: '4px', padding: '15px 40px', fontWeight: 900, cursor: 'pointer', boxShadow: '0 0 30px rgba(255,102,0,0.3)', letterSpacing: '4px', alignSelf: 'flex-start' }}>
                    AUTHORIZE_ARRIVL_
                  </button>
                </div>
                <div className="video-side" style={{ flex: 1.8, position: 'relative', border: '1px solid rgba(255,102,0,0.5)', background: '#000', overflow: 'hidden' }}>
                  <LazyVideo src={invasionClip} muted={false} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                  <div className="target-reticle" />
                  <div className="scanline" style={{ opacity: 0.4 }} />
                </div>
                {bootProgress > 0 && (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: '#ff6600', marginBottom: '20px', letterSpacing: '5px', fontWeight: 900 }}>SYNCING... {bootProgress}%</div>
                  </div>
                )}
                <div className="hud-corner top-left" style={{ width: '40px', height: '40px', borderWidth: '3px', borderColor: '#ff6600' }} />
                <div className="hud-corner bottom-right" style={{ width: '40px', height: '40px', borderWidth: '3px', borderColor: '#ff6600' }} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={scrollContainerRef} className="scroll-container" style={{ height: '100dvh', width: '100vw', overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth', background: '#000', opacity: loading ? 0 : 1, scrollSnapType: 'y mandatory' }}>
        
        {/* Vertical Mission Indicator - Moved outside for reliability */}
        <div style={{ position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 2500, display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-end' }}>
          <div className="mission-label" style={{ fontSize: '0.5rem', color: '#666', letterSpacing: '3px', marginBottom: '10px' }}>MISSION_CHRONOLOGY</div>
          {[
            { label: 'THE FIRST CONTACT', index: 1 },
            { label: 'THE INVASION', index: 2 },
            { label: 'THE PANIC', index: 3 },
            { label: 'FINAL ESCAPE', index: 4 }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              className="mission-item"
              whileHover={{ x: -10 }}
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({
                    top: item.index * window.innerHeight,
                    behavior: 'smooth'
                  });
                }
              }}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }}
            >
              <span className="mission-label" style={{ fontSize: '0.6rem', color: '#aaa', fontWeight: 900, letterSpacing: '1px', opacity: 0.8 }}>{item.label}</span>
              <div style={{ width: '30px', height: '2px', background: 'rgba(255,102,0,0.3)', position: 'relative' }}>
                <div className="mission-dot" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '6px', height: '6px', background: '#ff6600', borderRadius: '50%' }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Landing Section */}
        <section id="home" style={{ ...fullscreenSectionStyle, scrollSnapAlign: 'start' }}>
          <div className="notification-stack" style={{ position: 'absolute', bottom: '220px', right: '60px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
            <AnimatePresence>
              {notifications.map(n => (
                <motion.div 
                  key={n.id}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  style={{ background: 'rgba(255, 102, 0, 0.1)', border: '1px solid #ff6600', padding: '10px 20px', color: '#ff6600', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '2px', backdropFilter: 'blur(10px)', position: 'relative' }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '2px', height: '100%', background: '#ff6600' }} />
                  {n.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <LazyVideo className="hero-video" src={landingClip} muted={true} style={fullscreenVideoStyle} />
          <div className="grid-overlay" />
          <div className="planetary-map"><div className="map-grid"><div className="map-pulse" style={{ top: '20%', left: '30%' }} /><div style={{ position: 'absolute', top: '15%', left: '35%', fontSize: '0.4rem', color: 'var(--mars-red)', fontWeight: 900 }}>SECTOR_UNKNOWN</div><div className="map-pulse" style={{ top: '40%', left: '25%', animationDelay: '0.5s' }} /><div style={{ position: 'absolute', top: '45%', left: '30%', fontSize: '0.4rem', color: 'var(--mars-red)', fontWeight: 900 }}>VOID_MARKER</div><div className="map-pulse" style={{ top: '60%', left: '70%', animationDelay: '1s' }} /></div></div>
          <div className="side-hud-panel"><div style={{ fontSize: '0.6rem', color: 'var(--mars-red)', marginBottom: '10px' }}>LIFE_SUPPORT_SYSTEM</div><div className="stat-label">O2_LEVEL</div><div className="hud-bar"><div className="hud-bar-fill" style={{ animationDelay: '0s' }} /></div><div className="stat-label" style={{ marginTop: '10px' }}>CORE_TEMP</div><div className="hud-bar"><div className="hud-bar-fill" style={{ animationDelay: '-1.5s' }} /></div></div>
          <div className="radar-hud"><div className="radar-sweep" /></div>
          <div className="audio-visualizer">{[...Array(10)].map((_, i) => (<div key={i} className="bar" style={{ animationDelay: `${i * 0.1}s`, opacity: isMuted ? 0.2 : 1 }} />))}</div>
          <div className="audio-toggle-container" onClick={toggleAudio} style={{ position: 'fixed', bottom: '120px', left: '60px', zIndex: 100, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isMuted ? '#666' : '#ff6600', animation: isMuted ? 'none' : 'pulse 1.5s infinite' }} />
            <div style={{ fontSize: '0.6rem', color: isMuted ? '#666' : '#ff6600', letterSpacing: '2px', fontWeight: 900 }}>AUDIO_SYSTEM: {isMuted ? 'OFF' : 'LIVE'}</div>
          </div>
          <div className="alien-toggle-container" onClick={toggleAlienAudio} style={{ position: 'fixed', bottom: '160px', left: '60px', zIndex: 100, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isAlienMuted ? '#666' : '#00f2ff', animation: isAlienMuted ? 'none' : 'pulse 1.5s infinite' }} />
            <div style={{ fontSize: '0.6rem', color: isAlienMuted ? '#666' : '#00f2ff', letterSpacing: '2px', fontWeight: 900 }}>ALIEN_COMMS: {isAlienMuted ? 'OFF' : 'DECRYPTED'}</div>
          </div>
          <audio ref={audioRef} src={ambientSound} loop />
          <audio ref={alienAudioRef} src={alienVoice} loop />
          <div className="vertical-stats" style={{ position: 'absolute', bottom: '20px', left: '40px', zIndex: 100 }}>
            <div className="stat-item">
              <span className="stat-label">PROJECT</span>
              <span className="stat-value">REBIRTH</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">STATUS</span>
              <span className="stat-value">83 / 100</span>
            </div>
            <div 
              className="stat-item" 
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen();
                } else {
                  document.exitFullscreen();
                }
              }}
              style={{ cursor: 'pointer', borderTop: '1px solid rgba(255,102,0,0.2)', paddingTop: '10px', marginTop: '10px' }}
            >
              <span className="stat-label">VIEW_MODE</span>
              <span className="stat-value" style={{ color: '#ff6600' }}>[ CINEMATIC ]</span>
            </div>
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 2, ease: "easeOut" }} 
              style={{ textAlign: 'center', padding: '20px' }}
            >
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="mono" 
                style={{ fontSize: '0.7rem', letterSpacing: '8px', marginBottom: '20px' }}
              >
                A SURVIVAL SIMULATION
              </motion.p>
              
              <h1 className="wide-text glitch-reveal" style={{ fontSize: 'clamp(2.5rem, 12vw, 8rem)', lineHeight: 1.1, position: 'relative' }}>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                  style={{ display: 'block' }}
                >
                  PROJECT
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 1.5 }}
                  style={{ color: '#ff6600', display: 'block' }}
                >
                  REBIRTH.
                </motion.span>
              </h1>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 2, duration: 1.5 }}
                style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #ff6600, transparent)', marginTop: '20px' }}
              />
            </motion.div>
          </div>
        </section>

        {/* Story Mission Sections */}
        {storyScenes.map((scene, idx) => (
          <section key={idx} style={{ ...fullscreenSectionStyle, scrollSnapAlign: 'start' }}>
            <LazyVideo className="hero-video" src={scene.video} muted={true} style={fullscreenVideoStyle} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                style={{ textAlign: 'center', maxWidth: '800px', padding: '30px' }}
              >
                <motion.h2 
                  initial={{ letterSpacing: '0px', opacity: 0, y: 20 }}
                  whileInView={{ letterSpacing: '8px', opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="wide-text" 
                  style={{ fontSize: 'clamp(1.8rem, 8vw, 3.5rem)', marginBottom: '30px', color: '#fff', textShadow: '0 0 20px rgba(255,102,0,0.5)' }}
                >
                  {scene.title}
                </motion.h2>
                
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: '100%', opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #ff6600, transparent)', marginBottom: '30px', marginInline: 'auto' }}
                />

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="mono" 
                  style={{ fontSize: 'clamp(0.8rem, 4vw, 1.1rem)', color: '#fff', textShadow: '0 0 10px rgba(0,0,0,1)', letterSpacing: '2px', lineHeight: 1.6 }}
                >
                  <Typewriter text={scene.text} speed={30} />
                </motion.p>
              </motion.div>
            </div>
          </section>
        ))}


        {/* Signal Section */}
        <section id="signal" style={{ ...fullscreenSectionStyle, background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', scrollSnapAlign: 'start' }}>
          <div className="grid-overlay" style={{ opacity: 0.05 }} />
          <div className="glow-bar" style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: '200px', height: '2px', opacity: 0.5 }} />
          
          <div style={{ maxWidth: '1200px', width: '95%', position: 'relative', zIndex: 10 }}>
            <div className="broadcast-flex-container" style={{ gap: '80px', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ flex: 1, minWidth: '300px', padding: '0 10px' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                  <div style={{ color: '#ff6600', fontSize: '0.6rem', letterSpacing: '2px', marginBottom: '15px', fontWeight: 900 }}>[ BROADCAST_ORIGIN: DEEP_VOID_STATION ]</div>
                  <h2 className="wide-text" style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)', marginBottom: '30px', letterSpacing: '0.2rem', marginRight: '-0.2rem' }}>VOICE_OF_REBIRTH</h2>
                  <div className="mono" style={{ color: '#888', fontSize: '0.8rem', lineHeight: 1.8, borderLeft: '2px solid rgba(255,102,0,0.3)', paddingLeft: '20px' }}>
                    <p>Primary link severed. Direct contact is lost, but as long as we are alive, we will keep broadcasting these signals into the unknown. We have faith that they will eventually find a new home in the deep void.</p>
                    <p style={{ marginTop: '10px', color: '#ff6600', fontWeight: 900 }}>[ BROADCASTING_UNTIL_THE_END ]</p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="terminal-container"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ 
                  flex: 0.8, 
                  minWidth: '350px', 
                  background: 'rgba(255,102,0,0.02)', 
                  border: `1px solid ${isOverLimit ? '#ff0000' : 'rgba(255,102,0,0.1)'}`, 
                  padding: '40px', 
                  borderRadius: '4px', 
                  backdropFilter: 'blur(10px)', 
                  position: 'relative', 
                  overflow: 'hidden',
                  transition: 'border 0.3s ease'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: isOverLimit ? '#ff0000' : 'linear-gradient(90deg, transparent, #ff6600, transparent)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.6rem', color: '#666', letterSpacing: '2px' }}>TERMINAL_ID: SIG_ALPHA_9</div>
                  <div style={{ fontSize: '0.7rem', color: isOverLimit ? '#ff0000' : '#ff6600', fontWeight: 900, letterSpacing: '2px' }}>
                    {message.length} / {charLimit}
                  </div>
                </div>
                <textarea 
                  placeholder="TYPE ENCRYPTED MESSAGE..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ 
                    width: '100%', 
                    height: '150px', 
                    background: 'transparent', 
                    border: 'none', 
                    color: isOverLimit ? '#ff0000' : '#ff6600', 
                    fontFamily: 'JetBrains Mono', 
                    fontSize: '0.85rem', 
                    outline: 'none', 
                    resize: 'none', 
                    borderBottom: `1px solid ${isOverLimit ? 'rgba(255,0,0,0.3)' : 'rgba(255,102,0,0.1)'}`, 
                    marginBottom: '20px' 
                  }} 
                />
                <button 
                  className="btn-primary" 
                  disabled={isOverLimit || message.length === 0}
                  onClick={() => {
                    setFeedMessages(prev => [{ id: `USER_${Date.now()}`, text: message, sender: "YOU" }, ...prev]);
                    setMessage("");
                  }} 
                  style={{ 
                    width: '100%', 
                    background: isOverLimit ? '#333' : '#ff6600', 
                    color: isOverLimit ? '#666' : 'black', 
                    border: 'none', 
                    padding: '18px', 
                    fontWeight: 900, 
                    cursor: isOverLimit ? 'not-allowed' : 'pointer', 
                    letterSpacing: '4px', 
                    transition: 'all 0.3s',
                    opacity: isOverLimit || message.length === 0 ? 0.5 : 1
                  }}
                >
                  {isOverLimit ? 'SIGNAL_EXCEEDED' : 'BROADCAST_SIGNAL_'}
                </button>
                <div style={{ marginTop: '15px', fontSize: '0.5rem', color: '#444', textAlign: 'center' }}>ENCRYPTION_PROTOCOL: AES-256_QUANTUM</div>
              </motion.div>
            </div>

            {/* Global Signal Feed - Emotional Messages */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              style={{ marginTop: '80px', borderTop: '1px solid rgba(255,102,0,0.1)', paddingTop: '40px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <div className="map-pulse" style={{ position: 'relative', width: '12px', height: '12px', background: '#ff6600' }} />
                <div style={{ color: '#ff6600', fontSize: '0.7rem', letterSpacing: '5px', fontWeight: 900 }}>GLOBAL_SIGNAL_FEED [INTERCEPTED]</div>
              </div>
              
              <div className="broadcast-flex-container" style={{ gap: '20px', flexWrap: 'wrap' }}>
                {feedMessages.map((log, i) => (
                  <motion.div 
                    key={i}
                    className="feed-message-card"
                    whileHover={{ backgroundColor: 'rgba(255,102,0,0.05)', scale: 1.02 }}
                    style={{ flex: '1 1 240px', background: 'rgba(255,102,0,0.02)', border: '1px solid rgba(255,102,0,0.05)', padding: '20px', position: 'relative' }}
                  >
                    <div style={{ fontSize: '0.5rem', color: '#ff6600', marginBottom: '10px', opacity: 0.6 }}>{log.id} // FROM: {log.sender}</div>
                    <p className="mono" style={{ fontSize: '0.75rem', color: '#ccc', lineHeight: 1.6, fontStyle: 'italic' }}>"{log.text}"</p>
                    <div className="hud-corner top-left" style={{ width: '10px', height: '10px', border: '1px solid rgba(255,102,0,0.2)', position: 'absolute', top: 0, left: 0, borderRight: 'none', borderBottom: 'none' }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectRebirth;
