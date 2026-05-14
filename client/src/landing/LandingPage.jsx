'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Navbar from './components/Navbar.jsx'
import HeroSection from './sections/HeroSection.jsx'
import FeaturesSection from './sections/FeaturesSection.jsx'
import DemoSection from './sections/DemoSection.jsx'
import WorkflowSection from './sections/WorkflowSection.jsx'
import WhyUsSection from './sections/WhyUsSection.jsx'
import TestimonialsSection from './sections/TestimonialsSection.jsx'
import CTASection from './sections/CTASection.jsx'
import FooterSection from './sections/FooterSection.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('Section error:', this.props.name, error?.message)
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

export default function LandingPage() {
  const cursorGlowRef = useRef(null)
  const transitionTimerRef = useRef(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = e.clientX + 'px'
        cursorGlowRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current)
      }
    }
  }, [])

  const handleNavigateToApp = () => {
    if (isTransitioning) {
      return
    }

    setIsTransitioning(true)
    transitionTimerRef.current = window.setTimeout(() => {
      router.push('/app')
    }, 700)
  }

  return (
    <div
      style={{
        fontFamily: "'Poppins', 'Inter', sans-serif",
        background: '#020010',
        minHeight: '100vh',
        overflowX: 'hidden',
        color: '#fff',
        position: 'relative',
      }}
    >
      {/* Cursor glow */}
      <div
        ref={cursorGlowRef}
        style={{
          position: 'fixed',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(6,182,212,0.05) 42%, transparent 72%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9997,
          transition: 'left 0.1s ease, top 0.1s ease',
          top: '-140px',
          left: '-140px',
          filter: 'blur(10px)',
        }}
      />

      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,52,210,0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '-5%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', left: '30%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>

      <AnimatePresence>
        {isTransitioning ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle at center, rgba(20,12,44,0.78) 0%, rgba(2,0,16,0.94) 58%, rgba(2,0,16,0.98) 100%)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.36, ease: 'easeOut' }}
              style={{
                width: 'min(90vw, 420px)',
                padding: '2rem 1.6rem',
                borderRadius: '24px',
                border: '1px solid rgba(139,92,246,0.18)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
                boxShadow: '0 24px 80px rgba(0,0,0,0.35), 0 0 50px rgba(139,92,246,0.18)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 'auto -10% -38% -10%',
                  height: '180px',
                  background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(6,182,212,0.08) 42%, transparent 72%)',
                  filter: 'blur(22px)',
                }}
              />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                style={{
                  width: '68px',
                  height: '68px',
                  margin: '0 auto 1rem',
                  borderRadius: '50%',
                  border: '1px solid rgba(139,92,246,0.28)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  boxShadow: '0 0 30px rgba(139,92,246,0.18)',
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Poppins'",
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  color: '#fff',
                  transform: 'rotate(-360deg)',
                }}>
                  NF
                </div>
              </motion.div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontSize: '0.76rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(196,181,253,0.78)',
                  marginBottom: '0.7rem',
                  fontWeight: 600,
                }}>
                  Opening Workspace
                </div>
                <div style={{
                  fontFamily: "'Poppins'",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '0.55rem',
                }}>
                  Taking you to NeuralForge App
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.52)',
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                  marginBottom: '1.25rem',
                }}>
                  Loading dashboard experience with your AutoML workspace.
                </div>

                <div style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '999px',
                      background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <ErrorBoundary name="navbar">
          <Navbar onNavigateToApp={handleNavigateToApp} />
        </ErrorBoundary>

        <ErrorBoundary name="hero">
          <HeroSection onNavigateToApp={handleNavigateToApp} />
        </ErrorBoundary>

        <ErrorBoundary name="features">
          <FeaturesSection />
        </ErrorBoundary>

        <ErrorBoundary name="demo">
          <DemoSection onNavigateToApp={handleNavigateToApp} />
        </ErrorBoundary>

        <ErrorBoundary name="workflow">
          <WorkflowSection />
        </ErrorBoundary>

        <ErrorBoundary name="whyus">
          <WhyUsSection />
        </ErrorBoundary>

        <ErrorBoundary name="testimonials">
          <TestimonialsSection />
        </ErrorBoundary>

        <ErrorBoundary name="cta">
          <CTASection onNavigateToApp={handleNavigateToApp} />
        </ErrorBoundary>

        <ErrorBoundary name="footer">
          <FooterSection />
        </ErrorBoundary>
      </div>
    </div>
  )
}
