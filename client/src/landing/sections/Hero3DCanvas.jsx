import React, { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import { MeshDistortMaterial } from '@react-three/drei'

function ParticleSphere() {
  const ref = useRef()
  const count = 1200

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 0.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.07
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.15
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  )
}

function CoreSphere() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.12
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.3, 48, 48]} />
        <MeshDistortMaterial
          color="#4f46e5"
          emissive="#6d28d9"
          emissiveIntensity={0.4}
          distort={0.4}
          speed={1.5}
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>
    </Float>
  )
}

function OrbitRing({ args, rotation, color, opacity, speed }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={args} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

function CameraRig() {
  const { camera, mouse } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.x * 0.7 - camera.position.x) * 0.03
    camera.position.y += (mouse.y * 0.4 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Hero3DCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.2]}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[8, 8, 8]} intensity={1.2} color="#8b5cf6" />
        <pointLight position={[-8, -8, -8]} intensity={0.7} color="#06b6d4" />
        <CameraRig />
        <CoreSphere />
        <ParticleSphere />
        <OrbitRing
          args={[1.9, 0.012, 8, 100]}
          rotation={[Math.PI / 4, 0, 0]}
          color="#06b6d4"
          opacity={0.35}
          speed={0.25}
        />
        <OrbitRing
          args={[2.4, 0.008, 8, 100]}
          rotation={[Math.PI / 2, Math.PI / 6, 0]}
          color="#a78bfa"
          opacity={0.18}
          speed={-0.18}
        />
      </Suspense>
    </Canvas>
  )
}
