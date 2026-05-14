'use client'

import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, PointMaterial, Points } from '@react-three/drei'

function ParticleHalo() {
  const group = useRef(null)
  const positions = useMemo(() => {
    const count = 900
    const coords = new Float32Array(count * 3)

    for (let i = 0; i < count; i += 1) {
      const radius = 2.2 + Math.random() * 1.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      coords[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      coords[(i * 3) + 1] = radius * Math.sin(phi) * Math.sin(theta)
      coords[(i * 3) + 2] = radius * Math.cos(phi)
    }

    return coords
  }, [])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.2
    }
  })

  return (
    <Points ref={group} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        color="#70c7ff"
        size={0.028}
        sizeAttenuation
        transparent
        depthWrite={false}
        opacity={0.68}
      />
    </Points>
  )
}

function CoreMesh() {
  const mesh = useRef(null)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.12
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.12
    }
  })

  return (
    <Float speed={1.3} rotationIntensity={0.18} floatIntensity={0.3}>
      <mesh ref={mesh} scale={1.25}>
        <icosahedronGeometry args={[1.3, 8]} />
        <MeshDistortMaterial
          color="#6f63ff"
          emissive="#39d6ff"
          emissiveIntensity={0.25}
          distort={0.36}
          speed={1.2}
          roughness={0.12}
          metalness={0.78}
          transparent
          opacity={0.82}
        />
      </mesh>
    </Float>
  )
}

function OrbitRing({ scale, speed, color }) {
  const ring = useRef(null)

  useFrame((state) => {
    if (ring.current) {
      ring.current.rotation.z = state.clock.elapsedTime * speed
      ring.current.rotation.x = state.clock.elapsedTime * speed * 0.35
    }
  })

  return (
    <mesh ref={ring} scale={scale} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[2.3, 0.026, 20, 160]} />
      <meshBasicMaterial color={color} transparent opacity={0.24} />
    </mesh>
  )
}

function CameraRig() {
  const { camera, mouse } = useThree()

  useFrame(() => {
    camera.position.x += (mouse.x * 0.45 - camera.position.x) * 0.03
    camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 52 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      className="h-full w-full"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <pointLight position={[4, 3, 4]} intensity={1.2} color="#7b61ff" />
        <pointLight position={[-4, -2, 4]} intensity={1.1} color="#4fe5ff" />
        <CameraRig />
        <CoreMesh />
        <ParticleHalo />
        <OrbitRing scale={1} speed={0.2} color="#4fe5ff" />
        <OrbitRing scale={1.18} speed={-0.12} color="#9778ff" />
      </Suspense>
    </Canvas>
  )
}
