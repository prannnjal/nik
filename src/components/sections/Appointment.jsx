'use client';
import { useRef } from 'react';

export default function Appointment() {
  const formRef = useRef(null);

  return (
    <section
      id="appointment"
      style={{
        padding: '12rem 6vw',
        pointerEvents: 'auto',
        position: 'relative',
        zIndex: 10,
        background: 'var(--color-ivory)',
      }}
    >
      <div className="appointment-grid">

        {/* Left: intro */}
        <div>
          <p className="section-label" style={{ marginBottom: '2rem' }}>Reserve Your Experience</p>
          <h2 style={{ marginBottom: '2rem', lineHeight: 1.05 }}>
            Begin your journey<br />to
            <em style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}> refined elegance.</em>
          </h2>
          <span className="gold-line" />
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-taupe)', marginBottom: '3rem' }}>
            Each appointment is a private, unhurried experience curated entirely around you.
            We hold only a limited number of bookings each day to ensure the highest level of attention.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['Mon – Fri: 10:00 – 20:00', 'Saturday: 09:00 – 18:00', 'Sunday: By request only'].map((line, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-gold)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-taupe)' }}>{line}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="glass" style={{ padding: '3.5rem', borderRadius: '16px' }}>
          <form ref={formRef} onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-grid">
              <input className="form-field" type="text" placeholder="First name" required />
              <input className="form-field" type="text" placeholder="Last name" required />
            </div>
            <input className="form-field" type="email" placeholder="Email address" required />
            <input className="form-field" type="tel" placeholder="Phone number" />
            <select className="form-field" style={{ color: 'var(--color-taupe)', appearance: 'none' }}>
              <option value="">Select service</option>
              <option>Bespoke Hair Styling</option>
              <option>Signature Spa Ritual</option>
              <option>Luxury Nail Care</option>
              <option>Skin Alchemy</option>
            </select>
            <input className="form-field" type="date" />
            <textarea
              className="form-field"
              rows={3}
              placeholder="Any preferences or special requests..."
              style={{ resize: 'none' }}
            />
            <button className="btn-primary" style={{ padding: '1.2rem', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Request Appointment →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
