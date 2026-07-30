'use client';
import { useState } from 'react';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import Appointment from '@/components/sections/Appointment';
import Footer from '@/components/sections/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import Overlays from '@/components/Overlays';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Loading screen — unmounts visually via clipPath, keep in DOM briefly */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Global overlays */}
      <Overlays />


      {/* Page content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Hero loaded={loaded} />
        <Services />
        <About />
        <Gallery />
        <Testimonials />
        <Appointment />
        <Footer />
      </div>
    </main>
  );
}
