import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TIMELINE = [
  {
    hash: 'f9e2b1a',
    type: 'work',
    title: 'Game Developer',
    org: 'Fulltime / Sapcetoon',
    period: '2024 – Present',
    branch: 'main',
    branchColor: 'var(--green)',
    details: [
      'Published 2 games on Google Play Store with 100K+ combined downloads',
      'Conducted penetration testing engagements for SMB clients',
      'Developed mobile applications with Unity & Android SDK',
      'Provided vulnerability assessment and remediation reports',
    ],
    tags: ['Unity', '3D', 'Android', 'C#'],
  },
  {
    hash: 'c3a7d44',
    type: 'work',
    title: 'Game Developer',
    org: 'Freelance / Self-Employed',
    period: '2020 – 2022',
    branch: 'feature/game-dev',
    branchColor: 'var(--cyan)',
    details: [
      'Designed and built mobile games from concept to store release',
      'Implemented physics engines, AI pathfinding, and shader effects',
      'Optimized game performance for low-end Android devices',
      'Managed game monetization and analytics integration',
    ],
    tags: ['Unity', 'C#', 'Mobile', '3D'],
  },
  {
    hash: 'b1e8f77',
    type: 'education',
    title: 'B.Sc. Cybersecurity',
    org: 'SVU University / Online Platforms',
    period: '2019 – Present',
    branch: 'feature/security',
    branchColor: 'var(--neon)',
    details: [
      'Specialized in Software Engineering and Security',
      'Completed advanced penetration testing courses (CEH, OSCP prep)',
      'Participated in CTF competitions globally',
      'Discovered and reported 50+ CVEs through responsible disclosure',
      'Built and maintained personal security lab environment',
    ],
    tags: ['CEH', 'CTF', 'OSCP', 'Bug Bounty'],
  },
];

function CommitEntry({ entry, index, inView }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15 + 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 40px 1fr',
        gap: '0',
        alignItems: 'start',
        marginBottom: '0',
      }}
    >
      {/* Left content / empty */}
      <div style={{ padding: '0 32px 0 0', textAlign: 'right' }}>
        {isEven ? (
          <ContentCard entry={entry} />
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: '18px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-dim)',
          }}>
            <span style={{ color: entry.branchColor, opacity: 0.85, letterSpacing: '0.05em' }}>
              ({entry.branch})
            </span>
          </div>
        )}
      </div>

      {/* Center: dot + line */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.1, type: 'spring', stiffness: 300 }}
          style={{
            width: '16px', height: '16px',
            borderRadius: '50%',
            background: entry.branchColor,
            boxShadow: `0 0 8px ${entry.branchColor}80, 0 0 16px ${entry.branchColor}40`,
            zIndex: 2,
            marginTop: '18px',
            flexShrink: 0,
          }}
        />
        <div style={{
          width: '2px',
          flex: 1,
          background: `linear-gradient(to bottom, ${entry.branchColor}60, var(--border))`,
          minHeight: '40px',
        }} />
      </div>

      {/* Right content / empty */}
      <div style={{ padding: '0 0 0 32px' }}>
        {!isEven ? (
          <ContentCard entry={entry} />
        ) : (
          <div style={{
            paddingTop: '18px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-dim)',
          }}>
            <span style={{ color: entry.branchColor, opacity: 0.85, letterSpacing: '0.05em' }}>
              ({entry.branch})
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ContentCard({ entry }) {
  return (
    <motion.div
      whileHover={{
        borderColor: entry.branchColor,
        boxShadow: `0 0 12px ${entry.branchColor}30`,
      }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '18px',
        marginBottom: '32px',
        transition: 'all 0.25s',
      }}
    >
      {/* Commit hash */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color: 'var(--text-dim)',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <span style={{
          color: entry.branchColor,
          background: `${entry.branchColor}15`,
          padding: '2px 8px',
          borderRadius: '4px',
          border: `1px solid ${entry.branchColor}40`,
        }}>
          commit {entry.hash}
        </span>
        <span>{entry.period}</span>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-pixel)',
        fontSize: '10px',
        color: 'var(--text-bright)',
        marginBottom: '4px',
        lineHeight: 1.5,
      }}>
        {entry.title}
      </h3>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: entry.branchColor,
        marginBottom: '14px',
        opacity: 0.8,
      }}>
        @ {entry.org}
      </p>

      <ul style={{ listStyle: 'none', marginBottom: '14px' }}>
        {entry.details.map((detail, i) => (
          <li key={i} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text)',
            display: 'flex',
            gap: '8px',
            marginBottom: '4px',
            lineHeight: 1.6,
          }}>
            <span style={{ color: entry.branchColor, flexShrink: 0 }}>+</span>
            {detail}
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {entry.tags.map((tag) => (
          <span key={tag} className="tag" style={{
            fontSize: '10px',
            borderColor: `${entry.branchColor}40`,
            color: entry.branchColor,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 0.7, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          $ git log --all --graph --oneline
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          EXPERIENCE
        </motion.h2>

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          {TIMELINE.map((entry, i) => (
            <CommitEntry key={entry.hash} entry={entry} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .commit-entry { grid-template-columns: 0 40px 1fr !important; }
        }
      `}</style>
    </section>
  );
}
