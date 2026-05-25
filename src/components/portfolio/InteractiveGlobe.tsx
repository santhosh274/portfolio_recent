--- src/components/portfolio/InteractiveGlobe.tsx (原始)


+++ src/components/portfolio/InteractiveGlobe.tsx (修改后)
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Generate points on a sphere surface
function generatePoints(count: number, radius: number) {
  const points = [];
  const phiIncrement = Math.PI * (3 - Math.sqrt(5)); // Golden angle

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phiIncrement * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    points.push([x * radius, y * radius, z * radius]);
  }

  return new Float32Array(points.flat());
}

// Connection lines between nearby points
function generateConnections(points: Float32Array, maxDistance: number) {
  const connections: [number, number, number, number, number, number][] = [];
  const pointCount = points.length / 3;

  for (let i = 0; i < pointCount; i++) {
    for (let j = i + 1; j < pointCount; j++) {
      const dx = points[i * 3] - points[j * 3];
      const dy = points[i * 3 + 1] - points[j * 3 + 1];
      const dz = points[i * 3 + 2] - points[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < maxDistance) {
        connections.push([
          points[i * 3], points[i * 3 + 1], points[i * 3 + 2],
          points[j * 3], points[j * 3 + 1], points[j * 3 + 2]
        ]);
      }
    }
  }

  return new Float32Array(connections.flat());
}

function RotatingGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const pointCount = 800;
  const radius = 2;
  const maxConnectionDistance = 0.4;

  const positions = useMemo(() => generatePoints(pointCount, radius), []);
  const connections = useMemo(() => generateConnections(positions, maxConnectionDistance), [positions]);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
      globeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Globe wireframe sphere */}
      <Sphere args={[radius, 32, 32]}>
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Points on globe surface */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial size={0.04} color="#06b6d4" transparent opacity={0.8} />
      </points>

      {/* Connection lines */}
      {connections.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={connections.length / 6}
              array={connections}
              itemSize={6}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#06b6d4" transparent opacity={0.3} />
        </lineSegments>
      )}

      {/* Inner glow sphere */}
      <Sphere args={[radius * 0.95, 32, 32]}>
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.05}
        />
      </Sphere>
    </group>
  );
}

export default function InteractiveGlobe() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[60vh] md:w-[40vw] md:h-[70vh] lg:w-[35vw] lg:h-[80vh]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingGlobe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 0.75}
        />
      </Canvas>
    </div>
  );
}