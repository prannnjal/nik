'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const screenRef = useRef(null);
  const logoRef = useRef(null);
  const flowerRef = useRef(null);
  const petalsRef = useRef([]);
  const centerRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    // Entrance
    gsap.fromTo(logoRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
    );

    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        const exitTl = gsap.timeline({ onComplete: () => onComplete?.() });

        exitTl.to([logoRef.current, flowerRef.current], {
          opacity: 0,
          y: -20,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.in',
        })
        .to(screenRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
        }, '+=0.1')
        .to(backdropRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
        }, '-=0.8');
      }
    });

    // Blossom animation
    gsap.set(petalsRef.current, { scale: 0, transformOrigin: "50px 50px" });
    gsap.set(centerRef.current, { scale: 0, transformOrigin: "50px 50px" });
    gsap.set(flowerRef.current, { rotation: -180 });

    tl.to(petalsRef.current, {
      scale: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: 'elastic.out(1, 0.6)'
    }, "+=0.2")
    .to(centerRef.current, {
      scale: 1,
      duration: 0.5,
      ease: 'back.out(2)'
    }, "-=0.8")
    .to(flowerRef.current, {
      rotation: 0,
      duration: 2.5,
      ease: 'power2.out'
    }, "<")
    .to({}, { duration: 0.5 }); // Add a slight pause before exit

  }, [onComplete]);

  return (
    <>
      {/* Black backdrop that stays briefly behind the white screen as it slides up */}
      <div
        ref={backdropRef}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--color-charcoal, #1a1814)',
          zIndex: 99998,
        }}
      />

      {/* Main white loading screen */}
      <div
        ref={screenRef}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--color-ivory, #fdfbf7)',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'all',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
          
          {/* Enlarged Logo */}
          <div ref={logoRef}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpeg"
              alt="Secret Salon"
              style={{
                height: '140px',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            {/* Blossom Animation */}
            <svg 
              ref={flowerRef}
              width="70" 
              height="70" 
              viewBox="0 0 100 100" 
              style={{ overflow: 'visible' }}
            >
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
                </filter>
              </defs>
              
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <g key={angle} style={{ transformOrigin: '50px 50px', transform: `rotate(${angle}deg)` }}>
                  <path 
                    ref={el => petalsRef.current[i] = el}
                    d="M 50 50 C 25 25, 35 0, 50 0 C 65 0, 75 25, 50 50" 
                    fill="#c30a3f" 
                    filter="url(#shadow)"
                  />
                </g>
              ))}
              
              <g ref={centerRef} style={{ transformOrigin: '50px 50px' }}>
                <circle cx="50" cy="50" r="10" fill="#FFFFFF" filter="url(#shadow)" />
                {/* Pistils */}
                <circle cx="50" cy="45" r="1.5" fill="#c30a3f" />
                <circle cx="45" cy="49" r="1.5" fill="#c30a3f" />
                <circle cx="55" cy="49" r="1.5" fill="#c30a3f" />
                <circle cx="48" cy="54" r="1.5" fill="#c30a3f" />
                <circle cx="52" cy="54" r="1.5" fill="#c30a3f" />
              </g>
            </svg>
          </div>

        </div>
      </div>
    </>
  );
}
