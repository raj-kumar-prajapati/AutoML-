import React, { useRef, useMemo, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'

function NeuralParticles() {
  const ref = useRef()
  const count = 1500

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 7
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.04
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#06b6d4"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  )
}

function NeuralCore() {
  const ref = useRef()
  const wireRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ref.current) {
      ref.current.rotation.y = t * 0.18
      ref.current.rotation.z = t * 0.06
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.12
      wireRef.current.rotation.x = t * 0.09
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        <mesh ref={ref}>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshPhongMaterial
            color="#4f46e5"
            emissive="#6d28d9"
            emissiveIntensity={0.35}
            transparent
            opacity={0.55}
            shininess={80}
          />
        </mesh>
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.22} />
        </mesh>
      </group>
    </Float>
  )
}

function MouseCamera() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.2 - camera.position.x) * 0.025
    camera.position.y += (mouse.current.y * 0.8 - camera.position.y) * 0.025
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function AICanvas3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[-4, -4, 4]} intensity={1} color="#06b6d4" />
        <MouseCamera />
        <NeuralCore />
        <NeuralParticles />
      </Suspense>
    </Canvas>
  )
}
