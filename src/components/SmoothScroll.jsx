'use client';
import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.06,
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
