'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: '01',
    title: 'BESPOKE HAIR STYLING',
    desc: 'Precision cuts and colour crafted by masters of the trade. Every strand, intentional.',
    duration: '1 HR',
    price: '$85',
    img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80',
  },
  {
    id: '02',
    title: 'SIGNATURE SPA RITUAL',
    desc: 'Restorative therapies that fuse ancient wisdom with modern science. A complete reset.',
    duration: '90 MINS',
    price: '$120',
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80',
  },
  {
    id: '03',
    title: 'LUXURY NAIL CARE',
    desc: 'From classic french to bespoke artistry — each manicure is a small work of art.',
    duration: '45 MINS',
    price: '$50',
    img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80',
  },
  {
    id: '04',
    title: 'SKIN ALCHEMY',
    desc: 'Customised facials and dermal treatments using only the rarest botanical formulas.',
    duration: '1 HR',
    price: '$95',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80',
  },
];

export default function Services() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-header', 
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(itemsRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { 
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 75%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="services" 
      style={{ 
        padding: '8vw 6vw', 
        backgroundColor: 'var(--color-ivory)', 
        position: 'relative', 
        zIndex: 10 
      }}
    >
      {/* Header */}
      <div className="services-header" style={{ textAlign: 'center', marginBottom: '6vw', maxWidth: '700px', marginInline: 'auto' }}>
        <p style={{ 
          fontFamily: 'var(--font-sans)', 
          fontSize: '0.8rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em', 
          color: 'var(--color-greige)',
          marginBottom: '1rem'
        }}>
          Affordable Salon Services
        </p>
        <h2 style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
          fontWeight: 300, 
          color: 'var(--color-charcoal)',
          marginBottom: '1.5rem',
          textTransform: 'uppercase'
        }}>
          Complete Wellness
        </h2>
        <p style={{ 
          color: 'rgba(26,24,20,0.6)', 
          fontSize: '1rem', 
          lineHeight: 1.6 
        }}>
          Experience our signature treatments designed to rejuvenate your body and mind. We use only the finest products to ensure your complete satisfaction.
        </p>
      </div>

      {/* Grid */}
      <div className="services-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '3vw',
        justifyItems: 'center'
      }}>
        {SERVICES.map((svc, i) => (
          <div 
            key={i} 
            ref={el => itemsRef.current[i] = el}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              maxWidth: '300px'
            }}
          >
            {/* Circular Image */}
            <div style={{ 
              width: '100%', 
              aspectRatio: '1/1', 
              borderRadius: '50%', 
              overflow: 'hidden',
              marginBottom: '2rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={svc.img} 
                alt={svc.title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            
            <h3 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.25rem', 
              fontWeight: 400, 
              color: 'var(--color-charcoal)',
              marginBottom: '1rem',
              letterSpacing: '0.05em'
            }}>
              {svc.title}
            </h3>
            
            <p style={{ 
              fontSize: '0.9rem', 
              color: 'rgba(26,24,20,0.6)', 
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              flexGrow: 1
            }}>
              {svc.desc}
            </p>
            
            {/* Meta Info */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '1rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              color: 'var(--color-greige)',
              letterSpacing: '0.1em'
            }}>
              <span>DURATION : {svc.duration}</span>
              <span style={{ width: '1px', height: '12px', backgroundColor: 'rgba(26,24,20,0.2)' }}></span>
              <span>PRICE : {svc.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
