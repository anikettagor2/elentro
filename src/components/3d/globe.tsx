"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create a grid of points for the "data" look
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 2000; i++) {
      const phi = Math.acos(-1 + (2 * i) / 2000);
      const theta = Math.sqrt(2000 * Math.PI) * phi;
      pts.push(
        new THREE.Vector3().setFromSphericalCoords(2.2, phi, theta)
      );
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group scale={1.5}>
      {/* Central Core */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0}
          metalness={1}
          emissive="#4338ca"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Floating Data Points */}
      <group rotation={[0, 0, Math.PI / 4]}>
        {points.map((pt, i) => (
          <mesh key={i} position={pt}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>

      {/* Atmospheric Glow */}
      <mesh scale={1.2}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
