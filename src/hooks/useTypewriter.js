import { useState, useEffect } from 'react';

/**
 * Types text character by character.
 * @param {string[]} lines   — array of strings to type sequentially
 * @param {number}   speed   — ms between characters (default 40)
 * @param {number}   lineDelay — ms between lines (default 400)
 * @param {boolean}  start   — flag to begin typing (default true)
 */
export function useTypewriter(lines = [], speed = 40, lineDelay = 400, start = true) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) {
      setDisplayedLines([]);
      setDone(false);
      return;
    }

    let cancelled = false;
    let lineIndex = 0;
    let charIndex = 0;

    setDisplayedLines([]);
    setDone(false);

    const typeLine = () => {
      if (cancelled) return;
      if (lineIndex >= lines.length) {
        setDone(true);
        return;
      }

      const currentLine = lines[lineIndex] ?? '';

      setDisplayedLines((prev) => {
        const next = [...prev];
        if (next.length <= lineIndex) next.push('');
        return next;
      });

      const typeChar = () => {
        if (cancelled) return;

        charIndex += 1;
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[lineIndex] = currentLine.slice(0, charIndex);
          return next;
        });

        if (charIndex < currentLine.length) {
          setTimeout(typeChar, speed);
        } else {
          lineIndex += 1;
          charIndex = 0;
          setTimeout(typeLine, lineDelay);
        }
      };

      setTimeout(typeChar, speed);
    };

    typeLine();

    return () => {
      cancelled = true;
    };
  }, [lines, speed, lineDelay, start]);

  return { displayedLines, done };
}
