import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera, Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const MarsModel = () => {
  const marsRef = useRef();
  
  // This will suspend the component until the texture is loaded
  const texture = useTexture('/textures/mars_color.png');

  useFrame((state, delta) => {
    if (marsRef.current) {
      marsRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={marsRef}>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshStandardMaterial 
            map={texture} 
            bumpMap={texture}
            bumpScale={0.05}
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      </Float>
      
      {/* Atmosphere */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial 
          color="#ff4d4d"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

const MarsCanvas = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ff4d4d" />
        
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />
        
        <React.Suspense fallback={<mesh><sphereGeometry args={[2.5, 32, 32]} /><meshStandardMaterial color="#331111" /></mesh>}>
          <MarsModel />
        </React.Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default MarsCanvas;
