'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ loaded }) {
  const containerRef = useRef(null);
  const textContentRef = useRef(null);

  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Accent line fades in
      tl.fromTo('.hero-accent',
        { y: 20, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
      )
      // Each word reveals with blur + upward motion
      .fromTo('.hero-word',
        { y: 80, opacity: 0, filter: 'blur(20px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.4, stagger: 0.07, ease: 'power4.out' },
        '-=0.7'
      )
      // Subtext and CTA
      .fromTo(['.hero-desc', '.hero-cta'],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out' },
        '-=0.8'
      );

      // Parallax scroll effect for text
      gsap.to(textContentRef.current, {
        y: -250,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loaded]);

  const headline = ['Beauty,', 'Crafted', 'with', 'Elegance.'];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="section"
      style={{
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 6vw',
        pointerEvents: 'auto',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      {/* Video Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -2, overflow: 'hidden' }}>
        <video
          src="/7d05015b96.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      {/* Dark Elegant Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'linear-gradient(to bottom, rgba(26,24,20,0.3), rgba(26,24,20,0.7))' }} />

      <div ref={textContentRef} style={{ zIndex: 1, position: 'relative' }}>
        {/* Section label */}
        <p className="section-label" style={{ marginBottom: '2.5rem', opacity: loaded ? 1 : 0, color: 'var(--color-ivory)' }}>
          ◦ Maison Éclat ◦ Est. 2010
        </p>

        {/* Italic accent */}
        <p
          className="hero-accent accent-text"
          style={{ marginBottom: '1.5rem', opacity: 0, color: 'var(--color-gold)' }}
        >
          Crafted with care
        </p>

        {/* Big editorial headline */}
        <h1 style={{ marginBottom: '2.5rem', maxWidth: '820px', color: 'var(--color-ivory)' }}>
          {headline.map((word, i) => (
            <span
              key={i}
              className="hero-word"
              style={{
                display: 'inline-block',
                opacity: 0,
                marginRight: word === 'Beauty,' ? '0.18em' : '0.18em',
                lineHeight: 1,
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p className="hero-desc" style={{ fontSize: '1.25rem', maxWidth: '440px', marginBottom: '3rem', opacity: 0, color: 'rgba(241,238,229,0.85)' }}>
          Experience the epitome of quiet luxury —<br />where beauty becomes ritual.
        </p>

        {/* CTAs */}
        <div className="hero-cta hero-cta-container" style={{ opacity: 0 }}>
          <button className="btn-primary" style={{ backgroundColor: 'var(--color-ivory)', color: 'var(--color-charcoal)', borderColor: 'var(--color-ivory)' }} id="hero-book-btn">Reserve a Visit</button>
          <a href="#services" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-ivory)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
            Explore Services
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '3rem', left: '6vw', display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 1 }}>
        <div style={{ width: '40px', height: '1px', background: 'var(--color-ivory)' }} />
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-ivory)' }}>Scroll to explore</span>
      </div>
    </section>
  );
}
