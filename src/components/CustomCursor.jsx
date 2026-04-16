import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const [visible, setVisible] = useState(false);
  const mouse    = useRef({ x: 0, y: 0 });
  const ring     = useRef({ x: 0, y: 0 });
  const animId   = useRef(null);

  useEffect(() => {
    // Hide on mobile
    if (window.innerWidth <= 768) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const animateRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      }
      animId.current = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    animId.current = requestAnimationFrame(animateRing);

    // Hover effects on interactive elements
    const onHoverIn  = () => ringRef.current && (ringRef.current.style.transform += ' scale(1.8)');
    const onHoverOut = () => {};
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(animId.current);
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 10, height: 10,
          borderRadius: '50%',
          background: 'var(--green)',
          boxShadow: 'var(--glow-green)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
          mixBlendMode: 'screen',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1px solid var(--cyan)',
          boxShadow: 'var(--glow-cyan)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: visible ? 0.7 : 0,
          transition: 'opacity 0.2s, width 0.2s, height 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
