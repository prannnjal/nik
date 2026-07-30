export default function Footer() {
  const links = {
    'Explore': ['Services', 'Philosophy', 'Gallery', 'Journal'],
    'Connect': ['Instagram', 'Pinterest', 'TikTok', 'LinkedIn'],
    'Visit': ['The Studio', 'Gift Cards', 'Careers', 'Press'],
  };

  return (
    <footer style={{ background: 'var(--color-charcoal)', color: 'var(--color-ivory)', pointerEvents: 'auto', position: 'relative', zIndex: 10 }}>
      {/* Top CTA strip */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '5rem 6vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
      }}>
        <h2 style={{ color: 'var(--color-ivory)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', maxWidth: '600px' }}>
          Ready to experience the<br />
          <em style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Maison difference?</em>
        </h2>
        <button className="btn-outline" style={{ color: 'var(--color-ivory)', borderColor: 'var(--color-ivory)', flexShrink: 0 }}>
          Reserve a Visit
        </button>
      </div>

      {/* Main footer grid */}
      <div style={{ padding: '6rem 6vw 3rem', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem' }}>
        {/* Brand */}
        <div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 400, marginBottom: '1.5rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Maison Éclat
          </p>
          <p style={{ color: 'rgba(241,238,229,0.45)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '280px' }}>
            The intersection of pure ingredients, architectural design, and holistic wellness.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>
              Contact
            </p>
            <p style={{ color: 'rgba(241,238,229,0.55)', fontSize: '0.9rem' }}>hello@maisoneclat.com</p>
            <p style={{ color: 'rgba(241,238,229,0.55)', fontSize: '0.9rem' }}>+91 98765 43210</p>
          </div>
        </div>

        {/* Links */}
        {Object.entries(links).map(([col, items]) => (
          <div key={col}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-gold)', marginBottom: '1.5rem' }}>
              {col}
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {items.map(item => (
                <li key={item}>
                  <a href="#" style={{ color: 'rgba(241,238,229,0.5)', fontSize: '0.9rem', transition: 'color 0.3s', fontFamily: 'var(--font-sans)' }}
                    onMouseEnter={e => e.target.style.color = '#F1EEE5'}
                    onMouseLeave={e => e.target.style.color = 'rgba(241,238,229,0.5)'}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '2rem 6vw',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <p style={{ color: 'rgba(241,238,229,0.3)', fontSize: '0.78rem', fontFamily: 'var(--font-sans)' }}>
          &copy; {new Date().getFullYear()} Maison Éclat. All rights reserved.
        </p>
        <p style={{ color: 'rgba(241,238,229,0.3)', fontSize: '0.78rem', fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>
          Designed with intention.
        </p>
      </div>
    </footer>
  );
}
