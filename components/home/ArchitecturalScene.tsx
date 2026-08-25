"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";

type SceneProps = {
  lighting: "day" | "dusk" | "evening";
  entering?: boolean;
};

function CameraDrift({ entering = false }: { entering?: boolean }) {
  useFrame((state, delta) => {
    const { camera, pointer } = state;
    const targetZ = entering ? 4.8 : 11;
    camera.position.z += (targetZ - camera.position.z) * Math.min(delta * 0.9, 1);
    camera.position.x += (pointer.x * 0.35 - camera.position.x) * Math.min(delta * 0.25, 1);
    camera.position.y += ((entering ? 1.3 : 1.75) + pointer.y * 0.1 - camera.position.y) * Math.min(delta * 0.35, 1);
    camera.lookAt(0, 1.15, 0);
  });
  return null;
}

function ArrivalCar() {
  const car = useRef<Group>(null);
  useFrame((state) => {
    if (!car.current) return;
    car.current.position.x = ((state.clock.elapsedTime * 0.75 + 8) % 18) - 9;
  });
  return (
    <group ref={car} position={[-8, 0.13, 3.7]} scale={0.34}>
      <mesh position={[0, 0.24, 0]}><boxGeometry args={[2.4, 0.45, 1]} /><meshStandardMaterial color="#171719" metalness={0.9} roughness={0.17} /></mesh>
      <mesh position={[0.1, 0.58, 0]}><boxGeometry args={[1.2, 0.38, 0.88]} /><meshStandardMaterial color="#25262a" metalness={0.6} roughness={0.1} /></mesh>
      {[-0.72, 0.72].flatMap((x) => [-0.46, 0.46].map((z) => <mesh key={`${x}-${z}`} position={[x, 0.08, z]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.22, 0.22, 0.14, 18]} /><meshStandardMaterial color="#070707" /></mesh>))}
    </group>
  );
}

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const crown = useRef<Mesh>(null);
  useFrame((state) => {
    if (crown.current) crown.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.45 + position[0]) * 0.025;
  });
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.65, 0]}><cylinderGeometry args={[0.09, 0.14, 1.3, 10]} /><meshStandardMaterial color="#30271f" roughness={1} /></mesh>
      <mesh ref={crown} position={[0, 1.55, 0]}><dodecahedronGeometry args={[0.72, 1]} /><meshStandardMaterial color="#1f3027" roughness={0.88} /></mesh>
    </group>
  );
}

function Museum({ lighting, entering }: SceneProps) {
  const doors = entering ? 0.72 : 0.12;
  const warm = lighting === "day" ? "#fff4d7" : lighting === "dusk" ? "#ffc978" : "#ffb854";
  const metal = lighting === "day" ? "#b7b0a4" : "#766d61";
  return (
    <group position={[0, -0.25, 0]}>
      <mesh position={[0, 0.05, 1.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[18, 10]} /><meshStandardMaterial color="#181715" roughness={0.82} /></mesh>
      <mesh position={[0, 0.071, 2]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[5.8, 7.4]} /><meshStandardMaterial color="#0c1517" metalness={0.55} roughness={0.14} /></mesh>

      <mesh position={[0, 1.5, -0.2]}><boxGeometry args={[8.5, 3.1, 1.25]} /><meshStandardMaterial color="#121313" metalness={0.72} roughness={0.28} /></mesh>
      <mesh position={[-3.8, 1.75, 0.15]} rotation={[0, 0, -0.15]}><boxGeometry args={[2.2, 3.55, 1.45]} /><meshStandardMaterial color={metal} metalness={0.94} roughness={0.23} /></mesh>
      <mesh position={[3.8, 1.72, 0.1]} rotation={[0, 0, 0.15]}><boxGeometry args={[2.2, 3.55, 1.45]} /><meshStandardMaterial color={metal} metalness={0.94} roughness={0.23} /></mesh>

      <mesh position={[0, 2.33, 0.51]}><boxGeometry args={[4.55, 1.3, 0.12]} /><meshStandardMaterial color="#182126" transparent opacity={0.68} metalness={0.65} roughness={0.08} /></mesh>
      {[-1.55, -0.78, 0, 0.78, 1.55].map((x) => <mesh key={x} position={[x, 2.33, 0.59]}><boxGeometry args={[0.035, 1.28, 0.04]} /><meshStandardMaterial color="#9a8d75" metalness={1} /></mesh>)}
      <pointLight position={[0, 2.2, 1.15]} intensity={lighting === "day" ? 15 : 32} color={warm} distance={8} />

      <mesh position={[-0.78 - doors, 1.05, 0.7]} rotation={[0, -doors * 0.45, 0]}><boxGeometry args={[1.48, 2.18, 0.08]} /><meshStandardMaterial color="#152025" transparent opacity={0.76} metalness={0.65} roughness={0.07} /></mesh>
      <mesh position={[0.78 + doors, 1.05, 0.7]} rotation={[0, doors * 0.45, 0]}><boxGeometry args={[1.48, 2.18, 0.08]} /><meshStandardMaterial color="#152025" transparent opacity={0.76} metalness={0.65} roughness={0.07} /></mesh>
      <mesh position={[0, 3.62, -0.08]} scale={[1.15, 0.16, 0.66]}><sphereGeometry args={[3.8, 64, 24]} /><meshStandardMaterial color={metal} metalness={0.98} roughness={0.2} /></mesh>

      <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.2}>
        <mesh position={[-5.1, 0.9, 1.15]}><torusKnotGeometry args={[0.38, 0.09, 90, 12]} /><meshStandardMaterial color="#9c7448" metalness={1} roughness={0.22} /></mesh>
      </Float>
      <Tree position={[-5.7, 0, 0.3]} scale={0.92} />
      <Tree position={[5.7, 0, 0.45]} scale={1.12} />
      <Tree position={[-6.8, 0, 1.8]} scale={0.65} />
      <Tree position={[6.7, 0, 1.7]} scale={0.72} />
      <ArrivalCar />
      <ContactShadows position={[0, 0.08, 0]} scale={17} opacity={0.6} blur={2.3} far={10} />
    </group>
  );
}

export function ArchitecturalScene(props: SceneProps) {
  const sky = props.lighting === "day" ? "#9aabb4" : props.lighting === "dusk" ? "#403940" : "#10131b";
  const ambient = props.lighting === "day" ? 2.1 : props.lighting === "dusk" ? 1.15 : 0.45;
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.75, 11], fov: 39 }} gl={{ antialias: true, alpha: false }} style={{ background: sky }}>
      <fog attach="fog" args={[sky, 9, 23]} />
      <ambientLight intensity={ambient} />
      <directionalLight position={[-5, 8, 8]} intensity={props.lighting === "day" ? 3.4 : 1.3} color={props.lighting === "evening" ? "#a6b7ff" : "#fff2d9"} castShadow />
      <Museum {...props} />
      <CameraDrift entering={props.entering} />
    </Canvas>
  );
}
