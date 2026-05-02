import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import avatarImg from '../assets/owais.jpg';

const STATS = [
  { label: 'Years XP',      value: '5+',  color: 'var(--green)' },
  { label: 'Games Shipped', value: '3',   color: 'var(--cyan)'  },
  { label: 'Certs Earned', value: '11',  color: 'var(--neon)'  },
  { label: 'Bugs Squashed', value: '♾️',   color: 'var(--yellow)'},
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 0.7, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          // about.md
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          WHO AM I
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px', alignItems: 'start' }}
          className="about-grid">

          {/* Terminal window */}
          <motion.div
            className="terminal-window"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="terminal-topbar">
              <div className="dots">
                <div className="dot dot-red" />
                <div className="dot dot-yellow" />
                <div className="dot dot-green" />
              </div>
              <span className="title">~/owais/about.md</span>
            </div>
            <div className="terminal-body">
              <div style={{ marginBottom: '16px' }}>
                <span style={{ color: 'var(--cyan)' }}>owais@kali</span>
                <span style={{ color: 'var(--text-dim)' }}>:</span>
                <span style={{ color: 'var(--green)' }}>~</span>
                <span style={{ color: 'var(--text-dim)' }}>$ </span>
                <span style={{ color: 'var(--text)' }}>cat about.md</span>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{ lineHeight: 2 }}
              >
                <p style={{ color: 'var(--green)', marginBottom: '8px' }}>
                  # Owais Boshnak
                </p>
                <p style={{ color: 'var(--text)', marginBottom: '20px', fontSize: '13px' }}>
                  Hey! I'm a <span style={{ color: 'var(--cyan)' }}>Game Developer</span> and{' '}
                  <span style={{ color: 'var(--green)' }}>Cybersecurity Expert</span> who lives at the
                  intersection of creativity and security. I build immersive mobile games that players
                  love, I build immersive mobile games that players love, and pursue cybersecurity 
                  through projects, CTFs, and continuous learning..
                </p>

                <p style={{ color: 'var(--green)', marginBottom: '8px' }}>
                  ## What I Do
                </p>
                <div style={{ fontSize: '13px', color: 'var(--text)', marginBottom: '20px' }}>
                  {[
                    'Design and publish games on Google Play Store',
                    'Conduct penetration testing & vulnerability research',
                    'Develop secure, scalable software architectures',
                    'CTF competitions & bug bounty programs',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--green)' }}>▸</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--yellow)' }}>[INFO]</span> Currently open to freelance game dev &
                  security consulting projects.
                </p>

                <p style={{ color: 'var(--text-dim)', fontSize: '12px' }}>
                  <span style={{ color: 'var(--green)' }}>owais@kali</span>
                  <span>:~$ </span>
                  <span className="cursor-blink" />
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right panel: avatar placeholder + stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
              style={{
                width: '100%',
                aspectRatio: '1',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 0 0 1px var(--border), 0 20px 40px rgba(0,0,0,0.5)',
                cursor: 'none',
              }}
            >
              {/* Real photo */}
              <img
                src={avatarImg}
                alt="Owais Boshnak"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  filter: 'contrast(1.05) saturate(0.9)',
                  transition: 'filter 0.4s',
                }}
              />
              {/* Green tint overlay on hover */}
              <div
                className="avatar-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,255,136,0.25) 0%, transparent 50%)',
                  transition: 'opacity 0.3s',
                }}
              />
              {/* Scanline effect */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,136,0.04) 3px, rgba(0,255,136,0.04) 4px)',
                pointerEvents: 'none',
              }} />
              {/* Name tag at bottom */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: '20px 16px 14px',
                background: 'linear-gradient(to top, rgba(10,14,26,0.92) 0%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '9px',
                  color: 'black',
              
                  letterSpacing: '0.08em',
                }}>
                  OWAIS BOSHNAK
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'black',
                }}>
                  @0xOwais
                </div>
              </div>
              {/* Glowing border frame */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '12px',
                border: '1px solid var(--border-bright)',
                pointerEvents: 'none',
                boxShadow: 'inset 0 0 20px rgba(0,255,136,0.06)',
              }} />
            </motion.div>

            {/* Stats grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}>
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '16px 12px',
                    textAlign: 'center',
                    transition: 'all 0.3s',
                  }}
                  whileHover={{
                    borderColor: stat.color,
                    boxShadow: `0 0 12px ${stat.color}40`,
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '18px',
                    color: stat.color,
                    textShadow: `0 0 8px ${stat.color}80`,
                    marginBottom: '6px',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--text-dim)',
                    letterSpacing: '0.08em',
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
