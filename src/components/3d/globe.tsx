"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Optimized Globe Component
 * 
 * Uses InstancedMesh to render thousands of data points in a single draw call.
 * Includes smooth rotations and atmospheric glow effects.
 */
export function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const count = 2000;

  // Create points data
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      pts.push(new THREE.Vector3().setFromSphericalCoords(2.2, phi, theta));
    }
    return pts;
  }, [count]);

  // Initialize instances
  useEffect(() => {
    if (!instancedRef.current) return;
    const temp = new THREE.Object3D();
    points.forEach((pt, i) => {
      temp.position.copy(pt);
      temp.updateMatrix();
      instancedRef.current!.setMatrixAt(i, temp.matrix);
    });
    instancedRef.current.instanceMatrix.needsUpdate = true;
  }, [points]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (instancedRef.current) {
      instancedRef.current.rotation.y += 0.001;
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

      {/* Optimized Data Points using InstancedMesh */}
      <instancedMesh ref={instancedRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.6} />
      </instancedMesh>

      {/* Atmospheric Glow */}
      <mesh scale={1.2}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
