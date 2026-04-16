import { motion } from 'framer-motion';
import {
  FaGithub, FaLinkedin, FaAward, FaDiscord, FaInstagram,
} from 'react-icons/fa';

const SOCIALS = [
  { icon: FaGithub,   label: 'GitHub',   href: 'https://github.com/wesssso512', color: '#e6edf3' },
  { icon: FaLinkedin, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/owais-boshnak-16709b1aa/',  color: '#0a66c2' },
  { icon: FaAward,    label: 'Credly',    href: 'https://www.credly.com/badges/55d1c58f-9bc7-45aa-8ed5-45915dee90c3/linked_in_profile',   color: '#f4b400' },
  { icon: FaDiscord,  label: 'Discord',   href: 'https://discord.com/users/weso38522',   color: '#5865f2' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/owais.boshnak?igsh=ZzRoanNuMm4zZGJj', color: '#e4405f' },
];

export default function FloatingSocials() {
  return (
    <>
      {/* Desktop — fixed right side */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '4px',
          zIndex: 500,
          paddingRight: '0',
        }}
        className="socials-desktop"
      >
        {SOCIALS.map((s, i) => (
          <SocialItem key={s.label} social={s} delay={i * 0.08} />
        ))}

        {/* Vertical line below */}
        <div
          style={{
            width: '1px',
            height: '80px',
            background: 'linear-gradient(to bottom, var(--green), transparent)',
            marginRight: '20px',
            marginTop: '8px',
            boxShadow: 'var(--glow-green)',
          }}
        />
      </motion.div>

      {/* Mobile — bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          zIndex: 500,
          background: 'rgba(10,14,26,0.95)',
          borderTop: '1px solid var(--border)',
          padding: '10px 0',
        }}
        className="socials-mobile"
      >
        {SOCIALS.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px', height: '48px',
                color: 'var(--text-dim)',
                fontSize: '26px',
                transition: 'all 0.2s',
              }}
              aria-label={s.label}
            >
              <Icon />
            </a>
          );
        })}
      </motion.div>

      <style>{`
        .socials-mobile { display: none !important; }
        @media (max-width: 768px) {
          .socials-desktop { display: none !important; }
          .socials-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function SocialItem({ social, delay }) {
  const Icon = social.icon;
  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.4 + delay, duration: 0.4 }}
      aria-label={social.label}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px 12px 20px',
        borderRadius: '6px 0 0 6px',
        background: 'transparent',
        color: 'var(--text-dim)',
        textDecoration: 'none',
        fontSize: '24px',
        fontFamily: 'var(--font-mono)',
        transition: 'all 0.25s',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
        border: '1px solid transparent',
        borderRight: 'none',
      }}
      whileHover={{
        color: social.color,
        backgroundColor: 'rgba(0,255,136,0.06)',
        borderColor: 'var(--border)',
        x: -8,
        transition: { duration: 0.2 },
      }}
    >
      {/* Label appears on hover via CSS trick */}
      <motion.span
        initial={{ width: 0, opacity: 0 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          letterSpacing: '0.1em',
        }}
        className="social-label"
      >
        {social.label}
      </motion.span>
      <Icon />
    </motion.a>
  );
}
