import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaFolder, FaFolderOpen, FaShieldAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { SiPython } from 'react-icons/si';

const CYBER_PROJECTS = [
  {
    id: 'jet-vuln-scanner',
    name: 'Jet_Vuln_Scanner',
    description: 'A Python-based vulnerability scanner with socket and Nmap checks, CMS fingerprinting, SQL injection detection, XSS testing, and directory busting.',
    language: 'Python',
    langColor: '#3572A5',
    tags: ['Vulnerability Scanner', 'Web Security', 'Python'],
    stars: 0,
    forks: 0,
    lastCommit: 'Latest project',
    commitHash: 'main',
    url: 'https://github.com/wesssso512/Jet-Vuln-Scanner',
    icon: SiPython,
    status: 'active',
  },
];

function RepoCard({ project, index, inView }) {
  const [open, setOpen] = useState(false);
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      style={{ cursor: 'none' }}
    >
      <motion.div
        animate={open
          ? { borderColor: 'var(--cyan)', boxShadow: 'var(--glow-cyan), 0 12px 40px rgba(0,0,0,0.4)' }
          : { borderColor: 'var(--border)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }
        }
        transition={{ duration: 0.25 }}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {/* Repo header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '14px',
          padding: '18px 20px',
        }}>
          {/* Folder icon */}
          <motion.div
            animate={open ? { scale: 1.2, color: 'var(--cyan)' } : { scale: 1, color: '#e3b341' }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: '22px', flexShrink: 0, marginTop: '2px' }}
          >
            {open ? <FaFolderOpen /> : <FaFolder />}
          </motion.div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Repo name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 700,
                color: open ? 'var(--cyan)' : 'var(--green)',
                transition: 'color 0.2s',
              }}>
                owais /
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 700,
                color: open ? 'var(--cyan)' : 'var(--green)',
                transition: 'color 0.2s',
              }}>
                {project.name}
              </span>
              {project.status === 'active' && (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  padding: '2px 7px',
                  borderRadius: '20px',
                  background: 'rgba(0,255,136,0.12)',
                  border: '1px solid var(--green)',
                  color: 'var(--green)',
                }}>
                  Public
                </span>
              )}
            </div>

            {/* Short description on default state */}
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-dim)',
              lineHeight: 1.6,
              marginBottom: '12px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: open ? 'normal' : 'nowrap',
              transition: 'white-space 0.2s',
            }}>
              {project.description.slice(0, open ? undefined : 80)}{!open && '...'}
            </p>

            {/* Bottom meta row */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: project.langColor, display: 'inline-block' }} />
                {project.language}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)' }}>
                ★ {project.stars}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)' }}>
                ⑂ {project.forks}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-dim)',
                background: 'rgba(0,229,255,0.06)',
                padding: '2px 8px',
                borderRadius: '4px',
                border: '1px solid var(--border)',
              }}>
                {project.commitHash}
              </span>
            </div>
          </div>
        </div>

        {/* Expanded folder content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                padding: '0 20px 20px',
                borderTop: '1px dashed var(--border)',
                paddingTop: '16px',
              }}>
                {/* Tags */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag cyan" style={{ fontSize: '10px', padding: '3px 10px' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Last commit */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-dim)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span style={{ color: 'var(--green)' }}>●</span>
                  <span>Last commit: {project.lastCommit}</span>
                  <span style={{ color: 'var(--cyan)', opacity: 0.6 }}>#{project.commitHash}</span>
                </div>

                {/* View repo link */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--cyan)',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '5px',
                    border: '1px solid var(--cyan)',
                    transition: 'all 0.2s',
                    letterSpacing: '0.05em',
                  }}
                >
                  <FaExternalLinkAlt style={{ fontSize: '10px' }} />
                  View Repository →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function CyberProjects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="cyber" className="section" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 0.7, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          $ ls ~/repos/security — hover to open
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FaShieldAlt style={{ color: 'var(--cyan)' }} />
          SECURITY PROJECTS
        </motion.h2>

        {/* Git repo header row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-dim)',
            padding: '10px 16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
          }}
        >
          <span><span style={{ color: 'var(--green)' }}>owais@kali</span>: ~/repos/security</span>
          <span style={{ marginLeft: 'auto', color: 'var(--cyan)' }}>{CYBER_PROJECTS.length} repositories</span>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {CYBER_PROJECTS.map((project, i) => (
            <RepoCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
