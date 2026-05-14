'use client'

import { useState } from 'react'

const DEFAULT_TRANSFORM = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'

export default function InteractiveCard({
  children,
  className = '',
  glow = 'rgba(82, 182, 255, 0.18)',
}) {
  const [transform, setTransform] = useState(DEFAULT_TRANSFORM)
  const [spotlight, setSpotlight] = useState('50% 50%')
  const [active, setActive] = useState(false)

  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rotateX = ((y / rect.height) - 0.5) * -10
    const rotateY = ((x / rect.width) - 0.5) * 12

    setTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`)
    setSpotlight(`${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`)
    setActive(true)
  }

  function handleLeave() {
    setTransform(DEFAULT_TRANSFORM)
    setSpotlight('50% 50%')
    setActive(false)
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform,
        transition: active ? 'transform 120ms ease-out' : 'transform 220ms ease',
        boxShadow: active ? `0 24px 90px ${glow}` : undefined,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-200"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(360px circle at ${spotlight}, rgba(255,255,255,0.12), transparent 70%)`,
        }}
      />
      {children}
    </div>
  )
}
