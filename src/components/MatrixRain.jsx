import { useEffect, useRef } from 'react';

const CHARS = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEF#$%@!{}[]<>/\\|';

export default function MatrixRain({ opacity = 0.18 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let columns = [];
    let frame = 0;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    const fontSize = 14;

    const resize = () => {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;

      // Render at device pixel ratio to avoid persistent sub-pixel artifacts.
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(viewportWidth * dpr);
      canvas.height = Math.floor(viewportHeight * dpr);
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.floor(viewportWidth / fontSize);
      // preserve or init column drop positions
      const old = [...columns];
      columns = Array.from({ length: cols }, (_, i) => old[i] ?? Math.random() * (viewportHeight / fontSize) * -1);

      // Ensure stale pixels are dropped immediately after resize.
      ctx.clearRect(0, 0, viewportWidth, viewportHeight);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      // Stronger fade prevents long-term ghosting / green grid buildup.
      ctx.fillStyle = 'rgba(10, 14, 26, 0.18)';
      ctx.fillRect(0, 0, viewportWidth, viewportHeight);

      // Periodic hard clear to fully reset any accumulated artifacts.
      frame += 1;
      if (frame % 240 === 0) {
        ctx.clearRect(0, 0, viewportWidth, viewportHeight);
      }

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      columns.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;

        // Lead char — bright white/cyan
        if (Math.random() > 0.95) {
          ctx.fillStyle = `rgba(0, 229, 255, ${opacity + 0.3})`;
        } else {
          ctx.fillStyle = `rgba(0, 255, 136, ${opacity})`;
        }

        ctx.fillText(char, x, y * fontSize);

        // Reset column when off-screen, with randomness
        if (y * fontSize > viewportHeight && Math.random() > 0.975) {
          columns[i] = 0;
        } else {
          columns[i] = y + 1;
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 1,
      }}
    />
  );
}
