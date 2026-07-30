'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: '01',
    title: 'Bespoke\nHair Styling',
    desc: 'Precision cuts and colour crafted by masters of the trade. Every strand, intentional.',
    tag: 'Hair Atelier',
    img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
  },
  {
    num: '02',
    title: 'Signature\nSpa Ritual',
    desc: 'Restorative therapies that fuse ancient wisdom with modern science. A complete reset.',
    tag: 'Wellness Studio',
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
  },
  {
    num: '03',
    title: 'Luxury\nNail Care',
    desc: 'From classic french to bespoke artistry — each manicure is a small work of art.',
    tag: 'Nail Couture',
    img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
  },
  {
    num: '04',
    title: 'Skin\nAlchemy',
    desc: 'Customised facials and dermal treatments using only the rarest botanical formulas.',
    tag: 'Skin Lab',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
  },
];

export default function Services() {
  const wrapRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const items = itemRefs.current;

    // All items start hidden below
    gsap.set(items, { yPercent: 100, opacity: 0 });
    gsap.set(items[0], { yPercent: 0, opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapRef.current,
        start: 'top top',
        end: `+=${SERVICES.length * 100}%`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    items.forEach((item, i) => {
      if (i === 0) return;
      tl.to(items[i - 1], { yPercent: -100, opacity: 0, ease: 'power3.inOut' })
        .fromTo(item, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'power3.inOut' }, '<');
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div ref={wrapRef} id="services" style={{ height: '100vh', position: 'relative', overflow: 'hidden', pointerEvents: 'auto' }}>

      {/* Static left label */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '6vw',
        transform: 'translateY(-50%)',
        zIndex: 20,
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--color-greige)',
      }}>
        Our Services
      </div>

      {/* Sliding panels */}
      {SERVICES.map((svc, i) => (
        <div
          key={i}
          ref={el => itemRefs.current[i] = el}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            padding: '0 6vw',
          }}
        >
          {/* Left: Text */}
          <div style={{ paddingLeft: '4rem' }}>
            <p className="section-label" style={{ marginBottom: '1.5rem' }}>{svc.num} / {svc.tag}</p>
            <h2 style={{ whiteSpace: 'pre-line', marginBottom: '2rem', fontSize: 'clamp(3rem, 5.5vw, 5.5rem)' }}>
              {svc.title}
            </h2>
            <span className="gold-line" />
            <p style={{ maxWidth: '380px', lineHeight: 1.8, marginBottom: '2.5rem' }}>{svc.desc}</p>
            <button className="btn-outline">Learn More</button>
          </div>

          {/* Right: Dynamic Image */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '4rem' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={svc.img} 
              alt={svc.title}
              style={{
                width: '100%',
                height: '80vh',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
