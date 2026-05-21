"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { CybertruckModel } from "./cybertruck-model";

interface CybertruckSceneProps {
  autoRotate?: boolean;
  onAutoRotateChange?: (value: boolean) => void;
}

export function CybertruckScene({
  autoRotate = true,
  onAutoRotateChange,
}: CybertruckSceneProps) {
  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [4.5, 2.2, 5.5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Lighting rig */}
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight
          position={[-4, 6, -2]}
          angle={0.4}
          penumbra={1}
          intensity={1.5}
          color="#2a76a6"
        />
        <spotLight
          position={[4, 4, 2]}
          angle={0.5}
          penumbra={1}
          intensity={0.8}
          color="#5ba3d4"
        />

        <Suspense fallback={null}>
          <Environment preset="city" background={false} />
        </Suspense>

        <Suspense fallback={null}>
          <CybertruckModel autoRotate={autoRotate} />
        </Suspense>

        <ContactShadows
          position={[0, -0.42, 0]}
          opacity={0.55}
          scale={10}
          blur={2.4}
          far={4}
          color="#000000"
        />

        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={4}
          maxDistance={10}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.05}
          autoRotate={false}
          onStart={() => onAutoRotateChange?.(false)}
        />
      </Canvas>
    </div>
  );
}
