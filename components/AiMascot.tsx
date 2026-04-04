"use client";

import React, { useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ─── Mouse tracker shared state ─── */
const mousePos = { x: 0, y: 0 };

/* ─── GLB model path (URL-encoded for spaces) ─── */
const MODEL_PATH = "/wall-e/source/walle%20with%20textures.glb";

/* ─── Wall-E GLB Model ─── */
const WallEModel = () => {
  const bodyRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Object3D | null>(null);
  const rightEyeRef = useRef<THREE.Object3D | null>(null);
  const { scene } = useGLTF(MODEL_PATH);


  // Clone scene, adjust arm, enable shadows, find eye nodes
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    const armHolder: { value: THREE.Object3D | null } = { value: null };
    const rightHandParts: THREE.Object3D[] = [];

    const RIGHT_HAND_PARTS = ["walle025", "walle031", "walle032"];

    clone.traverse((child) => {
      if (child.name === "walle027") armHolder.value = child;
      if (RIGHT_HAND_PARTS.includes(child.name)) rightHandParts.push(child);

      // Store eye refs for mouse tracking
      if (child.name === "walle023") leftEyeRef.current = child;
      if (child.name === "walle024") rightEyeRef.current = child;

      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    const rightArm = armHolder.value;

    // Reparent all right hand parts under the arm so they move as one
    if (rightArm) {
      rightArm.updateWorldMatrix(true, false);
      const armWorldInverse = new THREE.Matrix4().copy(rightArm.matrixWorld).invert();
      const armWorldQuat = new THREE.Quaternion();
      rightArm.getWorldQuaternion(armWorldQuat);
      const armQuatInverse = armWorldQuat.clone().invert();

      rightHandParts.forEach((part) => {
        part.updateWorldMatrix(true, false);

        const worldPos = new THREE.Vector3();
        part.getWorldPosition(worldPos);
        const worldQuat = new THREE.Quaternion();
        part.getWorldQuaternion(worldQuat);

        part.removeFromParent();
        rightArm.add(part);

        const localPos = worldPos.applyMatrix4(armWorldInverse);
        part.position.copy(localPos);

        const localQuat = worldQuat.premultiply(armQuatInverse);
        part.quaternion.copy(localQuat);
      });

      rightArm.rotation.z = -0.15;
    }

    return clone;
  }, [scene]);

  useFrame(() => {
    // Only eyes track the mouse cursor
    // Y-axis = left/right look, Z-axis = up/down look (model is rotated ~90° on Y)
    const eyeTargetY = mousePos.x * 0.6;
    const eyeTargetZ = mousePos.y * 0.5;

    [leftEyeRef, rightEyeRef].forEach((eyeRef) => {
      if (eyeRef.current) {
        eyeRef.current.rotation.y = THREE.MathUtils.lerp(
          eyeRef.current.rotation.y,
          eyeTargetY,
          0.08
        );
        eyeRef.current.rotation.z = THREE.MathUtils.lerp(
          eyeRef.current.rotation.z,
          eyeTargetZ,
          0.08
        );
      }
    });
  });

  return (
    <group
      ref={bodyRef}
      scale={1.0}
      position={[0, -1.35, 0]}
      rotation={[0, -Math.PI / 2 - 0.5, 0]}
    >
      <primitive object={clonedScene} />
    </group>
  );
};

/* ─── Floating particles around the robot ─── */
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 50;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const t = state.clock.getElapsedTime();
    particlesRef.current.rotation.y = t * 0.02;

    const posArray = particlesRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += Math.sin(t + i) * 0.001;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00f3ff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

/* ─── Scene with lighting ─── */
const WallEScene = () => {
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mousePos.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      {/* Lighting — bright and vivid */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[3, 5, 5]}
        intensity={2.5}
        color="#c8d8ff"
        castShadow
      />
      <directionalLight
        position={[-2, 3, 4]}
        intensity={1.2}
        color="#ffffff"
      />
      <pointLight position={[-3, 2, 3]} intensity={1.0} color="#00f3ff" />
      <pointLight position={[2, -1, 2]} intensity={0.6} color="#7c3aed" />
      <pointLight position={[0, 0, 5]} intensity={1.2} color="#ffffff" />
      <spotLight
        position={[0, 5, 3]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.5}
        color="#ffffff"
        castShadow
      />

      {/* Ground reflection glow */}
      {/* <mesh position={[0, -1.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.8, 32]} />
        <meshStandardMaterial
          color="#00f3ff"
          emissive="#00f3ff"
          emissiveIntensity={0.15}
          transparent
          opacity={0.2}
        />
      </mesh> */}

      <Float
        speed={2}
        rotationIntensity={0.1}
        floatIntensity={0.3}
        floatingRange={[-0.08, 0.08]}
      >
        <group scale={viewport.width > 6 ? 1.0 : 0.8}>
          <WallEModel />
        </group>
      </Float>

      <FloatingParticles />
    </>
  );
};

/* ─── Exported component ─── */
export const AiMascot = () => {
  return (
    <div
      className="relative w-[340px] h-[400px] md:w-[420px] md:h-[540px]"
      style={{
        maskImage:
          "radial-gradient(ellipse 82% 85% at 56% 50%, black 48%, transparent 85%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 82% 85% at 56% 50%, black 48%, transparent 85%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 40 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <WallEScene />
        </Suspense>
      </Canvas>

      {/* Ground shadow */}
      {/* <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[200px] h-[20px] bg-cyber-cyan/10 rounded-full blur-xl" /> */}
    </div>
  );
};

// Preload the model so it's ready when the component mounts
useGLTF.preload(MODEL_PATH);
