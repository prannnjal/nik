'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const screenRef = useRef(null);
  const barRef = useRef(null);
  const numRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    let current = 0;
    const target = 100;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out progress
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(eased * target);
      setCount(current);

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${eased})`;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Cinematic exit
        const tl = gsap.timeline({
          onComplete: () => onComplete?.()
        });

        tl.to(numRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in'
        })
        .to(logoRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in'
        }, '-=0.3')
        .to(screenRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.2,
          ease: 'power4.inOut',
        }, '-=0.1');
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <div
      ref={screenRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#1A1814',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        clipPath: 'inset(0 0 0% 0)',
      }}
    >
      {/* Logo */}
      <div
        ref={logoRef}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.2rem',
          color: 'rgba(241,238,229,0.4)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '4rem',
        }}
      >
        Maison Éclat
      </div>

      {/* Counter */}
      <div
        ref={numRef}
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(5rem, 12vw, 9rem)',
          color: '#F1EEE5',
          lineHeight: 1,
          fontWeight: 300,
          letterSpacing: '-0.04em',
        }}
      >
        {count}
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: '3rem',
        left: '6vw',
        right: '6vw',
        height: '1px',
        background: 'rgba(255,255,255,0.1)',
      }}>
        <div
          ref={barRef}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #C5A059, #F1EEE5)',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </div>
  );
}
