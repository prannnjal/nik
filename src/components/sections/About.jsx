'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-line',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
        }
      );
      gsap.fromTo('.about-stat',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-stats', start: 'top 70%' }
        }
      );
      // Continuous rotation for the doodle flower
      gsap.to('.doodle-flower', {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'none'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section"
      style={{ padding: '12rem 6vw', pointerEvents: 'auto', position: 'relative', zIndex: 10, overflow: 'hidden' }}
    >
      {/* Decorative Doodle Flower on the right */}
      <div 
        className="doodle-flower"
        style={{ 
          position: 'absolute', 
          top: '30%', 
          right: '-15%', 
          width: '500px', 
          height: '500px',
          opacity: 0.15,
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 100" 
          style={{ overflow: 'visible' }}
        >
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <g key={angle} style={{ transformOrigin: '50px 50px', transform: `rotate(${angle}deg)` }}>
              <path 
                d="M 50 50 C 25 25, 35 0, 50 0 C 65 0, 75 25, 50 50" 
                fill="none" 
                stroke="#c30a3f"
                strokeWidth="2"
              />
            </g>
          ))}
          <g style={{ transformOrigin: '50px 50px' }}>
            <circle cx="50" cy="50" r="10" fill="none" stroke="#c30a3f" strokeWidth="2" />
            <circle cx="50" cy="45" r="1.5" fill="#c30a3f" />
            <circle cx="45" cy="49" r="1.5" fill="#c30a3f" />
            <circle cx="55" cy="49" r="1.5" fill="#c30a3f" />
            <circle cx="48" cy="54" r="1.5" fill="#c30a3f" />
            <circle cx="52" cy="54" r="1.5" fill="#c30a3f" />
          </g>
        </svg>
      </div>

      {/* Marquee */}
      <div className="marquee-wrapper" style={{ marginBottom: '8rem', position: 'relative', zIndex: 1 }}>
        <div className="marquee-track">
          {Array.from({ length: 2 }).flatMap((_, ri) =>
            ['Hair Styling', 'Skin Rituals', 'Spa Therapy', 'Nail Couture', 'Brow Design', 'Body Wellness'].map((item, i) => (
              <span key={`${ri}-${i}`} className="marquee-item">
                {item} <span className="marquee-dot">◆</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Philosophy */}
      <div className="about-grid" style={{ position: 'relative', zIndex: 1 }}>
        <div>
          <p className="section-label about-line" style={{ marginBottom: '2rem' }}>Our Philosophy</p>
          <h2 className="about-line" style={{ lineHeight: 1.05 }}>
            Where ritual becomes beauty,<br />and space becomes sanctuary.
          </h2>
        </div>
        <div>
          <p className="about-line" style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--color-taupe)' }}>
            We believe true luxury doesn&apos;t announce itself. It&apos;s felt in the weight of a warm towel,
            the precise angle of a cut, the scent of our bespoke botanical blends &mdash;
            and the silence between moments.
          </p>
          <span className="gold-line about-line" style={{ marginTop: '2rem' }} />
          <p className="about-line" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--color-greige)' }}>
            &quot;Excellence is not a destination. It is a continuous journey that never ends.&quot;
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="about-stats about-stats-grid" style={{ position: 'relative', zIndex: 1 }}>
        {[
          { num: '14+', label: 'Years of mastery' },
          { num: '6K+', label: 'Guests served' },
          { num: '28', label: 'Expert artisans' },
          { num: '100%', label: 'Botanical formulas' },
        ].map((stat, i) => (
          <div key={i} className="about-stat">
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--color-charcoal)', lineHeight: 1 }}>
              {stat.num}
            </p>
            <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-greige)', marginTop: '0.5rem' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
