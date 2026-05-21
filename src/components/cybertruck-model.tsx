"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

interface CybertruckModelProps {
  autoRotate?: boolean;
}

/**
 * Procedural low-poly Cybertruck.
 * No external assets — built from Three.js primitives so it always renders.
 */
export function CybertruckModel({ autoRotate = true }: CybertruckModelProps) {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && ref.current) {
      ref.current.rotation.y += delta * 0.25;
    }
  });

  // Brand colors
  const body = "#9aa3ad";   // brushed steel
  const dark = "#1a1d24";   // glass / trim
  const accent = "#2a76a6"; // brand blue accent

  return (
    <group ref={ref} position={[0, -0.4, 0]} scale={0.9}>
      {/* Lower hull (rear cargo box) */}
      <mesh position={[0.4, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.85, 1.55]} />
        <meshStandardMaterial color={body} metalness={0.85} roughness={0.35} />
      </mesh>

      {/* Front lower section */}
      <mesh position={[-1.5, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.75, 1.55]} />
        <meshStandardMaterial color={body} metalness={0.85} roughness={0.35} />
      </mesh>

      {/* Iconic angled greenhouse / cabin (trapezoidal prism via lathe-free approach) */}
      <mesh position={[-0.4, 1.18, 0]} castShadow>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              // Trapezoidal prism vertices (front-left, front-right, back-right, back-left × top/bottom)
              // Bottom face Y = -0.3
              -1.4, -0.3,  0.78,   1.4, -0.3,  0.78,   1.4, -0.3, -0.78,  -1.4, -0.3, -0.78,
              // Top face Y = 0.3 — narrower (the wedge)
              -0.6,  0.3,  0.78,   0.7,  0.3,  0.78,   0.7,  0.3, -0.78,  -0.6,  0.3, -0.78,
            ]), 3]}
          />
          <bufferAttribute
            attach="index"
            args={[new Uint16Array([
              // Bottom (skip — covered by hull)
              // Top
              4, 5, 6,  4, 6, 7,
              // Front (sloped windshield)
              0, 1, 5,  0, 5, 4,
              // Back (sloped rear window)
              2, 3, 7,  2, 7, 6,
              // Left side
              3, 0, 4,  3, 4, 7,
              // Right side
              1, 2, 6,  1, 6, 5,
            ]), 1]}
          />
        </bufferGeometry>
        <meshStandardMaterial color={body} metalness={0.85} roughness={0.35} flatShading />
      </mesh>

      {/* Windshield — dark glass panel */}
      <mesh position={[-1.1, 1.18, 0]} rotation={[0, 0, 0]} castShadow>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              -0.7, -0.3,  0.76,   0.7, -0.3,  0.76,   0.7,  0.3,  0.76,  -0.7,  0.3,  0.76,
              -0.7, -0.3, -0.76,   0.7, -0.3, -0.76,   0.7,  0.3, -0.76,  -0.7,  0.3, -0.76,
            ]), 3]}
          />
          <bufferAttribute
            attach="index"
            args={[new Uint16Array([0, 1, 2, 0, 2, 3,  4, 6, 5, 4, 7, 6]), 1]}
          />
        </bufferGeometry>
        <meshStandardMaterial color={dark} metalness={0.6} roughness={0.05} />
      </mesh>

      {/* Roof line accent strip */}
      <mesh position={[-0.4, 1.5, 0]}>
        <boxGeometry args={[1.4, 0.02, 1.5]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
      </mesh>

      {/* Front headlight bar (LED strip) */}
      <mesh position={[-2.28, 0.7, 0]}>
        <boxGeometry args={[0.04, 0.05, 1.4]} />
        <meshStandardMaterial color="#e8f4ff" emissive="#5ba3d4" emissiveIntensity={2.5} />
      </mesh>

      {/* Rear taillight bar */}
      <mesh position={[1.51, 0.7, 0]}>
        <boxGeometry args={[0.04, 0.05, 1.4]} />
        <meshStandardMaterial color="#ff5050" emissive="#ff2020" emissiveIntensity={2} />
      </mesh>

      {/* Wheels */}
      {[
        [-1.2, 0.05,  0.78],
        [-1.2, 0.05, -0.78],
        [ 1.0, 0.05,  0.78],
        [ 1.0, 0.05, -0.78],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          {/* Tire */}
          <mesh castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.32, 24]} />
            <meshStandardMaterial color="#0d0e12" roughness={0.95} metalness={0.05} />
          </mesh>
          {/* Hub */}
          <mesh position={[0, 0.001, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.34, 8]} />
            <meshStandardMaterial color="#3a3d44" metalness={0.9} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* Underglow accent */}
      <pointLight position={[0, 0.1, 0]} intensity={2} distance={3} color={accent} />
    </group>
  );
}
