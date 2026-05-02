import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const GAME_SKILLS = [
  { name: 'Unity',         color: 'var(--green)' },
  { name: 'Roblox',         color: 'var(--green)' },
  { name: 'Lua',         color: 'var(--green)' },
  { name: 'C#',            color: 'var(--cyan)'  },
  { name: 'C++',           color: 'var(--green)' },
  { name: 'Game Design',   color: 'var(--cyan)'  },
  { name: 'Android SDK',   color: 'var(--neon)'  },
  { name: 'Shader Graph',  color: 'var(--green)' },
  { name: 'Physics Sim',   color: 'var(--cyan)'  },
  { name: 'Blender',       color: 'var(--green)' },
  { name: 'Firebase',      color: 'var(--yellow)'},
  { name: 'Google Play',   color: 'var(--cyan)'  },
  { name: 'AI/NavMesh',    color: 'var(--neon)'  },
  { name: 'Animation',    color: 'var(--neon)'  },
];

const CYBER_SKILLS = [
  { name: 'Nmap',                color: 'var(--cyan)'  },
  { name: 'BeautifulSoup',       color: 'var(--green)' },
  { name: 'Socket Programming',   color: 'var(--neon)' },
  { name: 'Penetration Testing', color: 'var(--cyan)'  },
  { name: 'Kali Linux',          color: 'var(--green)' },
  { name: 'Metasploit',          color: 'var(--red)'   },
  { name: 'Burp Suite',          color: 'var(--cyan)'  },
  { name: 'Wireshark',           color: 'var(--neon)'  },
  { name: 'OSINT',               color: 'var(--green)' },
  { name: 'CTF Challenges',      color: 'var(--cyan)'  },
  { name: 'Reverse Engineering', color: 'var(--red)'   },
  { name: 'Python',              color: 'var(--green)' },
  { name: 'Bash Scripting',      color: 'var(--cyan)'  },
  { name: 'Network Analysis',    color: 'var(--neon)'  },
  { name: 'Malware Analysis',    color: 'var(--red)'   },
];

function SkillTag({ skill, index, inView }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.05, duration: 0.3, type: 'spring', stiffness: 200 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        padding: '6px 14px',
        borderRadius: '20px',
        border: `1px solid ${skill.color}40`,
        color: 'var(--text-dim)',
        cursor: 'default',
        transition: 'all 0.25s',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{
        color: skill.color,
        borderColor: skill.color,
        boxShadow: `0 0 10px ${skill.color}50`,
        scale: 1.05,
      }}
    >
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: skill.color, flexShrink: 0 }} />
      {skill.name}
    </motion.span>
  );
}

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 0.7, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          $ ls -la ~/skills/
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          SKILLS & TOOLS
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}
          className="skills-grid">

          {/* Game Dev Column */}
          <motion.div
            className="terminal-window"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="terminal-topbar">
              <div className="dots">
                <div className="dot dot-red" />
                <div className="dot dot-yellow" />
                <div className="dot dot-green" />
              </div>
              <span className="title">~/skills/game-dev</span>
            </div>
            <div className="terminal-body">
              <div style={{ marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-dim)', fontSize: '11px' }}>
                  drwxr-xr-x  game_dev/
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {GAME_SKILLS.map((s, i) => (
                  <SkillTag key={s.name} skill={s} index={i} inView={inView} />
                ))}
              </div>
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)' }}>
                  <span style={{ color: 'var(--green)' }}>branch</span>: game-dev/main
                  <span style={{ marginLeft: '16px', color: 'var(--cyan)' }}>commits</span>: 2,400+
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cybersecurity Column */}
          <motion.div
            className="terminal-window"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="terminal-topbar">
              <div className="dots">
                <div className="dot dot-red" />
                <div className="dot dot-yellow" />
                <div className="dot dot-green" />
              </div>
              <span className="title">~/skills/cybersecurity</span>
            </div>
            <div className="terminal-body">
              <div style={{ marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-dim)', fontSize: '11px' }}>
                  drwxr-xr-x  cybersecurity/
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {CYBER_SKILLS.map((s, i) => (
                  <SkillTag key={s.name} skill={s} index={i} inView={inView} />
                ))}
              </div>
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)' }}>
                  <span style={{ color: 'var(--red)' }}>branch</span>: security/pentest
                  <span style={{ marginLeft: '16px', color: 'var(--cyan)' }}>CVEs</span>: 10+
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
