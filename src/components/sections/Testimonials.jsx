'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: 'An absolute masterclass in refined aesthetics and personalised care. Maison Éclat has redefined my concept of luxury.',
    author: 'Elena R.',
    role: 'Vogue Editorial Director',
  },
  {
    quote: 'The kind of place you don\'t tell anyone about — because you want it all to yourself. Every visit feels like a private ritual.',
    author: 'Priya N.',
    role: 'Creative Director, Bloom Studio',
  },
  {
    quote: 'From the scent the moment you walk in to the way the light falls — it is the most considered space I have ever experienced.',
    author: 'Sophie L.',
    role: 'Interior Architect',
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-content', {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const switchTo = (i) => {
    gsap.to('.testimonial-text', { y: -20, opacity: 0, duration: 0.35, ease: 'power2.in', onComplete: () => {
      setActive(i);
      gsap.fromTo('.testimonial-text', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
    }});
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        padding: '12rem 6vw',
        pointerEvents: 'auto',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      {/* Video Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -2, overflow: 'hidden' }}>
        <video
          src="/istockphoto-1319050362-640_adpp_is.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.08)' }}
        />
      </div>
      {/* Dark Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'rgba(26,24,20,0.65)' }} />
      <div style={{ maxWidth: '900px', margin: '0 auto' }} className="testimonial-content">
        <p className="section-label" style={{ color: 'var(--color-taupe)', marginBottom: '4rem', textAlign: 'center' }}>
          Client Voices
        </p>

        {/* Quote */}
        <blockquote className="testimonial-text" style={{ textAlign: 'center', color: 'var(--color-ivory)' }}>
          <p className="testimonial-quote">
            &ldquo;{TESTIMONIALS[active].quote}&rdquo;
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span className="gold-line" style={{ margin: '0 auto 1rem' }} />
            <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-gold)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {TESTIMONIALS[active].author}
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-taupe)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
              {TESTIMONIALS[active].role}
            </span>
          </div>
        </blockquote>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '4rem' }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => switchTo(i)}
              style={{
                width: i === active ? '2rem' : '0.5rem',
                height: '2px',
                borderRadius: '2px',
                background: i === active ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'none',
                transition: 'all 0.4s var(--ease-premium)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
