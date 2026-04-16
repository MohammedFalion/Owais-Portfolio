import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';

const FLOAT_CHARS = ['{', '}', '<', '>', '/', ';', '#', '0', '1', '$', '()', '=>', '[]', '&&', '||', '!=', '=='];

function FloatingChar({ char, style }) {
  return (
    <span
      style={{
        position: 'absolute',
        fontFamily: 'var(--font-mono)',
        color: 'var(--green)',
        opacity: 0,
        pointerEvents: 'none',
        animation: `float-up ${style.duration}s ${style.delay}s linear infinite`,
        left: style.left,
        bottom: '-20px',
        fontSize: style.size,
        ...style,
      }}
    >
      {char}
    </span>
  );
}

const BOOT_LINES = [
  '> Initializing system...',
  '> Loading kernel modules...',
  '> Mounting /dev/owais...',
  '> Running owais.boshnak --mode=portfolio',
  '> ACCESS GRANTED',
];

export default function Hero() {
  const { displayedLines, done } = useTypewriter(BOOT_LINES, 35, 250, true);
  const [showMain, setShowMain] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Random floating chars
  const floaters = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      char:     FLOAT_CHARS[Math.floor(Math.random() * FLOAT_CHARS.length)],
      left:     `${Math.random() * 95}%`,
      duration: 8 + Math.random() * 12,
      delay:    Math.random() * 10,
      size:     `${10 + Math.random() * 14}px`,
      opacity:  0.15 + Math.random() * 0.35,
    })), []);

  useEffect(() => {
    if (done) {
      setTimeout(() => setShowMain(true), 400);
    }
  }, [done]);

  // Periodic glitch
  useEffect(() => {
    if (!showMain) return;
    const glitch = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    };
    const id = setInterval(glitch, 4000 + Math.random() * 3000);
    return () => clearInterval(id);
  }, [showMain]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '60px',
      }}
    >
      {/* Dark overlay so matrix rain doesn't overpower text */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,14,26,0.72)', zIndex: 1 }} />

      {/* Floating code symbols */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden', pointerEvents: 'none' }}>
        {floaters.map((f, i) => (
          <FloatingChar key={i} char={f.char} style={f} />
        ))}
      </div>

      {/* Terminal boot sequence */}
      <motion.div
        style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: '700px', padding: '0 32px' }}
      >
        {/* Boot terminal */}
        <AnimatePresence>
          {!showMain && (
            <motion.div
              key="boot"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(11px, 1.5vw, 13px)',
                lineHeight: 2,
              }}
            >
              {displayedLines.map((line, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--cyan)', opacity: 0.5, fontSize: '10px' }}>
                    [{String(i + 1).padStart(2, '0')}]
                  </span>
                  <span
                    style={{
                      color: line.includes('ACCESS') ? 'var(--neon)' : 'var(--green)',
                      textShadow: line.includes('ACCESS') ? 'var(--glow-neon)' : 'none',
                    }}
                  >
                    {line}
                  </span>
                  {i === displayedLines.length - 1 && (
                    <span className="cursor-blink" />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main hero content */}
        <AnimatePresence>
          {showMain && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center' }}
            >
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--green)',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                  opacity: 0.8,
                }}
              >
                &lt; My Portfolio /&gt;
              </motion.p>

              {/* Glitch Name */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ position: 'relative', marginBottom: '12px' }}
              >
                <h1
                  style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: 'clamp(20px, 5vw, 42px)',
                    color: 'var(--green)',
                    letterSpacing: '0.04em',
                    lineHeight: 1.3,
                    textShadow: 'var(--glow-green)',
                    animation: glitchActive ? 'glitch 0.3s steps(1) forwards, glitch-2 0.3s steps(1) forwards' : 'none',
                    position: 'relative',
                  }}
                >
                  OWAIS
                </h1>
                <h1
                  style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: 'clamp(20px, 5vw, 42px)',
                    color: 'var(--cyan)',
                    letterSpacing: '0.04em',
                    lineHeight: 1.3,
                    textShadow: 'var(--glow-cyan)',
                  }}
                >
                  BOSHNAK
                </h1>
              </motion.div>

              {/* Role tags */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginBottom: '40px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                }}
              >
                <span style={{
                  padding: '6px 16px',
               
                  color: 'var(--green)',
              
                  letterSpacing: '0.1em',
                }}>
                  🎮 Game Developer
                </span>
                <span style={{
                  color: 'var(--text-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '18px',
                  fontFamily: 'var(--font-mono)',
                }}>
                  &&
                </span>
                <span style={{
                  padding: '6px 16px',

                  color: 'var(--cyan)',

                  letterSpacing: '0.1em',
                }}>
                  🔐 Cybersecurity Expert
                </span>
              </motion.div>

              {/* Typed tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(11px, 1.6vw, 13px)',
                  color: 'var(--text-dim)',
                  marginBottom: '48px',
                  maxWidth: '500px',
                  margin: '0 auto 48px',
                  lineHeight: 1.8,
                }}
              >
                <span style={{ color: 'var(--text-dim)' }}># </span>
                Building immersive game worlds by day,
                <br />
                breaking into systems (ethically) by night.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <button
                  className="btn"
                  onClick={() => document.querySelector('#games')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span style={{ color: 'var(--green)', marginRight: '4px' }}>$</span>
                  <span>./view_projects.sh</span>
                </button>
                <button
                  className="btn btn-cyan"
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span style={{ color: 'var(--cyan)', marginRight: '4px' }}>$</span>
                  <span>./contact_me.sh</span>
                </button>
              </motion.div>

              {/* Scroll hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                style={{
                  position: 'absolute',
                  bottom: '-80px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--text-dim)',
                  letterSpacing: '0.15em',
                  animation: 'glow-pulse 2s ease-in-out infinite',
                }}
              >
                <span>SCROLL</span>
                <div style={{
                  width: '1px',
                  height: '40px',
                  background: 'linear-gradient(to bottom, var(--green), transparent)',
                  boxShadow: 'var(--glow-green)',
                }} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
