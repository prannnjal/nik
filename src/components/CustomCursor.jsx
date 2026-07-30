'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      // Dot follows instantly
      if (dot) {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
      }
    };

    // Ring lerps behind
    const loop = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.1;
      if (ring) {
        ring.style.left = `${ringPos.current.x}px`;
        ring.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(loop);

    // Hover states
    const selectors = 'a, button, input, select, textarea, [data-hover], .gallery-img';
    const handleEnter = () => {
      dot?.classList.add('hover');
      ring?.classList.add('hover');
    };
    const handleLeave = () => {
      dot?.classList.remove('hover');
      ring?.classList.remove('hover');
    };

    const attachListeners = () => {
      document.querySelectorAll(selectors).forEach(el => {
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
    };
    attachListeners();

    // Re-attach on DOM changes
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
