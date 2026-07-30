'use client';
import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ── Material shared between all objects ──
function PremiumMat({ color = '#F5F0E8' }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.15}
      metalness={0.05}
      envMapIntensity={1.5}
    />
  );
}

// ── 6 Luxury Objects that swap on scroll ──
function ScrollObject() {
  const groupRef = useRef();
  const jarRef = useRef();
  const serumRef = useRef();
  const dryerRef = useRef();
  const nailRef = useRef();
  const stoneRef = useRef();
  const candleRef = useRef();
  const perfumeRef = useRef();

  const { scene: perfumeScene } = useGLTF('/perfume_bottle.glb');

  useFrame((state) => {
    if (perfumeRef.current) {
      perfumeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  useEffect(() => {
    // Start: only jar visible
    if (jarRef.current) {
      jarRef.current.visible = true;
      jarRef.current.scale.setScalar(1);
    }

    const showIndex = (index) => {
      if (index === 0 && jarRef.current) {
        gsap.to(jarRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.9, ease: 'back.out(1.7)' });
      }
      
      if (index === 1 && serumRef.current) {
        serumRef.current.visible = true;
        gsap.to(serumRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.9, ease: 'back.out(1.7)' });
      }
      if (index === 2 && dryerRef.current) {
        dryerRef.current.visible = true;
        gsap.to(dryerRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.9, ease: 'back.out(1.7)' });
      }
      if (index === 3 && nailRef.current) {
        nailRef.current.visible = true;
        gsap.to(nailRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.9, ease: 'back.out(1.7)' });
      }
      if (index === 4 && stoneRef.current) {
        stoneRef.current.visible = true;
        gsap.to(stoneRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.9, ease: 'back.out(1.7)' });
      }
      if (index === 5 && candleRef.current) {
        candleRef.current.visible = true;
        gsap.to(candleRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.9, ease: 'back.out(1.7)' });
      }
    };

    // Map sections to object index
    const chapters = [
      { trigger: '#hero',        index: 0 },
      { trigger: '#services',    index: 1 },
      { trigger: '#about',       index: 3 },
      { trigger: '#gallery',     index: 4 },
      { trigger: '#testimonials',index: 5 },
      { trigger: '#appointment', index: 5 },
    ];

    chapters.forEach(({ trigger, index }) => {
      const el = document.querySelector(trigger);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        onEnter: () => showIndex(index),
        onLeaveBack: () => {
          const prev = chapters.findIndex(c => c.trigger === trigger) - 1;
          if (prev >= 0) showIndex(chapters[prev].index);
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <group ref={groupRef} position={[2, 0, -1.5]}>
      <group ref={jarRef}>
        <primitive ref={perfumeRef} object={perfumeScene} scale={2} position={[0, -0.5, 0]} />
      </group>
      <mesh ref={serumRef} visible={false}>
        <cylinderGeometry args={[0.32, 0.32, 2.5, 64]} />
        <PremiumMat color="#DCD7CD" />
      </mesh>
      <mesh ref={dryerRef} visible={false}>
        <boxGeometry args={[0.7, 1.9, 0.55]} />
        <PremiumMat color="#C8C3B8" />
      </mesh>
      <group ref={nailRef} visible={false}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.26, 2.1, 32]} />
          <PremiumMat color="#E2C9C9" />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.18, 0.22, 0.35, 32]} />
          <PremiumMat color="#C5A059" />
        </mesh>
      </group>
      <mesh ref={stoneRef} visible={false}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="#C8BFB0" roughness={0.88} metalness={0} />
      </mesh>
      <group ref={candleRef} visible={false}>
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 1.6, 64]} />
          <meshStandardMaterial color="#F5EEE0" roughness={0.75} metalness={0} />
        </mesh>
        <mesh position={[0, 0.88, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.08, 64]} />
          <meshStandardMaterial color="#C5A059" roughness={0.3} metalness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/perfume_bottle.glb');

export default function ThreeCanvas({ loaded }) {
  if (!loaded) return null;

  return (
    <div id="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 8, 5]} intensity={1.4} color="#FFF9F0" />
        <directionalLight position={[-5, -3, -4]} intensity={0.3} color="#D4B896" />
        <pointLight position={[0, 5, 3]} intensity={0.6} color="#F1EEE5" />

        <Environment preset="apartment" />
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
          <ScrollObject />
        </Float>
      </Canvas>
    </div>
  );
}
