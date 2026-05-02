"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Globe } from "./globe";
import { Environment, OrbitControls } from "@react-three/drei";

export function GlobeScene() {
  return (
    <div className="w-full h-full min-h-[500px] relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
          <spotLight
            position={[-10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <Globe />
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
