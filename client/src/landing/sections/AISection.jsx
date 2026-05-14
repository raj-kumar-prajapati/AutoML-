import React, { useRef, useMemo, Suspense, useEffect, useState, lazy } from 'react'
import { motion, useInView } from 'framer-motion'

// Lazy load the 3D canvas
const AICanvas3D = lazy(() => import('./AICanvas3D.jsx'))

export default function AISection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setWebglSupported(false)
    } catch {
      setWebglSupported(false)
    }
  }, [])

  return (
    <section id="ai-section" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 2 }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div
        ref={ref}
        style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        {/* 3D Canvas or fallback */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            height: '420px', borderRadius: '24px', overflow: 'hidden',
            position: 'relative',
            background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(2,0,16,0.6) 70%)',
            border: '1px solid rgba(139,92,246,0.2)',
          }}
        >
          {webglSupported ? (
            <Suspense fallback={
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '3rem' }}>🧠</div>
                <div style={{ fontSize: '0.9rem' }}>Loading AI Core...</div>
              </div>
            }>
              <AICanvas3D />
            </Suspense>
          ) : (
            /* Fallback for no WebGL: CSS animation of a brain-like shape */
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: '200px', height: '200px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                boxShadow: '0 0 60px rgba(139,92,246,0.5)',
                animation: 'aiPulse 3s ease-in-out infinite',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '5rem',
              }}>🧠</div>
            </div>
          )}
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.3rem 1rem', borderRadius: '100px',
            border: '1px solid rgba(139,92,246,0.3)',
            background: 'rgba(139,92,246,0.08)',
            marginBottom: '1.5rem',
            fontSize: '0.8rem', color: '#a78bfa', fontWeight: 500,
          }}>
            🧠 AI CORE ENGINE
          </div>

          <h2 style={{
            fontFamily: "'Poppins'", fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            background: 'linear-gradient(135deg, #fff, #a78bfa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '1.25rem', lineHeight: 1.2,
            margin: '0 0 1.25rem',
          }}>
            Neural Intelligence<br />at Your Fingertips
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
            Our AI core continuously evaluates model performance, tunes hyperparameters 
            in real time, and selects the best algorithm — automatically.
          </p>

          {[
            ['Gradient Boosting Ensemble', '#8b5cf6'],
            ['AutoML Hyperparameter Tuning', '#06b6d4'],
            ['Cross-validation & Overfitting Guard', '#f59e0b'],
            ['Real-time Feature Importance', '#10b981'],
          ].map(([feat, color], i) => (
            <motion.div
              key={feat}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                marginBottom: '0.75rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)',
              }}
            >
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: color, boxShadow: `0 0 8px ${color}`, flexShrink: 0,
              }} />
              {feat}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes aiPulse {
          0%,100% { box-shadow: 0 0 60px rgba(139,92,246,0.5); transform: scale(1); }
          50% { box-shadow: 0 0 100px rgba(139,92,246,0.8); transform: scale(1.05); }
        }
      `}</style>
    </section>
  )
}
