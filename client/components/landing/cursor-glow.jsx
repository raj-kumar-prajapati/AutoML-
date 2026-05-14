'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const glowX = useSpring(cursorX, { damping: 30, stiffness: 250, mass: 0.2 })
  const glowY = useSpring(cursorY, { damping: 30, stiffness: 250, mass: 0.2 })
  const dotX = useSpring(cursorX, { damping: 50, stiffness: 600, mass: 0.12 })
  const dotY = useSpring(cursorY, { damping: 50, stiffness: 600, mass: 0.12 })

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    const updateMode = () => setEnabled(media.matches)
    const handleMove = (event) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
    }

    updateMode()
    media.addEventListener('change', updateMode)
    window.addEventListener('pointermove', handleMove)

    return () => {
      media.removeEventListener('change', updateMode)
      window.removeEventListener('pointermove', handleMove)
    }
  }, [cursorX, cursorY])

  if (!enabled) {
    return null
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[120] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(79,229,255,0.18)_0%,rgba(123,97,255,0.12)_38%,transparent_72%)] blur-3xl"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[121] h-4 w-4 rounded-full border border-white/70 bg-white/40 shadow-[0_0_24px_rgba(79,229,255,0.45)] backdrop-blur"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
