'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PHOTOS = [
  {
    url: '/7d05015b96.mp4',
    alt: 'Salon atmosphere',
    gridCol: 'span 7', gridRow: 'span 2', aspectRatio: '4/3',
    isVideo: true,
  },
  {
    url: 'https://picsum.photos/seed/spa1/800/600',
    alt: 'Spa ritual',
    gridCol: 'span 5', gridRow: 'span 1', aspectRatio: '3/2',
  },
  {
    url: 'https://picsum.photos/seed/spa2/800/600',
    alt: 'Luxury cosmetics',
    gridCol: 'span 5', gridRow: 'span 1', aspectRatio: '3/2',
  },
  {
    url: 'https://picsum.photos/seed/spa3/800/800',
    alt: 'Nail artistry',
    gridCol: 'span 4', gridRow: 'span 1', aspectRatio: '1/1',
  },
  {
    url: 'https://picsum.photos/seed/spa4/800/800',
    alt: 'Hair styling',
    gridCol: 'span 4', gridRow: 'span 1', aspectRatio: '1/1',
  },
  {
    url: 'https://picsum.photos/seed/spa5/800/800',
    alt: 'Wellness space',
    gridCol: 'span 4', gridRow: 'span 1', aspectRatio: '1/1',
  },
];

export default function Gallery() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-img',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section"
      style={{ padding: '10rem 6vw', pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <div>
          <p className="section-label" style={{ marginBottom: '1rem' }}>The Atmosphere</p>
          <h2>Inside the<br /><em style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Maison</em></h2>
        </div>
        <button className="btn-outline">View All</button>
      </div>

      {/* Masonry Grid */}
      <div className="gallery-grid-responsive">
        {PHOTOS.map((photo, i) => (
          <div
            key={i}
            className="gallery-img gallery-img-responsive"
            data-hover
            style={{
              gridColumn: photo.gridCol,
              aspectRatio: photo.aspectRatio,
              borderRadius: '6px',
              overflow: 'hidden',
              opacity: 0,
              position: 'relative',
            }}
          >
            {photo.isVideo ? (
              <video
                src={photo.url}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={photo.url}
                alt={photo.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            )}
            {/* Subtle overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(26,24,20,0.25), transparent)',
              pointerEvents: 'none',
            }} />
          </div>
        ))}
      </div>
    </section>
  );
}
