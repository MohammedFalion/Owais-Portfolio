import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'about',    href: '#about' },
  { label: 'skills',   href: '#skills' },
  { label: 'games',    href: '#games' },
  { label: 'security', href: '#cyber' },
  { label: 'xp',       href: '#experience' },
  { label: 'contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: '60px',
          background: scrolled
            ? 'rgba(10, 14, 26, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleClick('#hero'); }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--green)',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
          }}
        >
          <span style={{ color: 'var(--cyan)', fontSize: '11px' }}>owais@portfolio</span>
          <span style={{ color: 'var(--text-dim)' }}>:</span>
          <span style={{ color: 'var(--green)' }}>~</span>
          <span style={{ color: 'var(--text-dim)' }}>$</span>
          <span
            style={{
              display: 'inline-block',
              width: '8px', height: '14px',
              background: 'var(--green)',
              animation: 'blink 1s step-end infinite',
              boxShadow: 'var(--glow-green)',
              marginLeft: '4px',
            }}
          />
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-dim)',
                padding: '6px 14px',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                position: 'relative',
              }}
              whileHover={{ color: 'var(--green)', backgroundColor: 'rgba(0,255,136,0.06)' }}
            >
              <span style={{ color: 'var(--text-dim)', fontSize: '10px', marginRight: '3px' }}>./</span>
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Hamburger for mobile */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '6px 10px',
            color: 'var(--green)',
            cursor: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
          }}
          className="nav-hamburger"
        >
          {menuOpen ? '[X]' : '[=]'}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '60px', left: 0, right: 0,
              zIndex: 999,
              background: 'rgba(10,14,26,0.97)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid var(--border)',
              padding: '20px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--text)',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ color: 'var(--green)', marginRight: '8px' }}>$</span>
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}
