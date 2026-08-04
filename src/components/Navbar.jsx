'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    // Entrance after loader
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 2.8 }
    );

    // Compact on scroll
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      toggleClass: { className: 'navbar-compact', targets: navRef.current }
    });
  }, []);

  const navItems = ['Services', 'About', 'Gallery', 'Appointment'];

  return (
    <nav
      ref={navRef}
      className="glass nav-container"
      style={{
        position: 'fixed',
        top: 0,
        zIndex: 1000,
        padding: '1.8rem 6vw',
        transition: 'padding 0.5s var(--ease-premium), background 0.5s',
        opacity: 0,
      }}
    >
      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.jpeg"
        alt="Secret Salon"
        style={{
          height: '48px',
          width: 'auto',
          objectFit: 'contain',
        }}
      />

      {/* Nav links */}
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item}>
            <Link
              href={`#${item.toLowerCase()}`}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-charcoal)',
                transition: 'color 0.3s',
                position: 'relative',
                paddingBottom: '2px',
              }}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button className="btn-primary" style={{ padding: '0.75rem 1.8rem', fontSize: '0.75rem', width: 'auto' }}>
        Reserve a Visit
      </button>
    </nav>
  );
}
