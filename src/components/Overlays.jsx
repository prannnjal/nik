'use client';
import { useEffect, useState } from 'react';

export default function Overlays() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Gold scroll progress line */}
      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
      />
    </>
  );
}
