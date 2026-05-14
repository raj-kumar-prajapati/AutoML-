import React, { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'

const Hero3DCanvas = lazy(() => import('./Hero3DCanvas.jsx'))

const HEADLINE = ['Build,', 'Train', '&', 'Deploy', 'AI', 'Models']

export default function HeroSection({ onNavigateToApp }) {
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.9 }}>
        <Suspense fallback={null}>
          <Hero3DCanvas />
        </Suspense>
      </div>

      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        background: 'radial-gradient(ellipse at center, transparent 24%, rgba(2,0,16,0.52) 64%, #020010 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '6.5rem 1.5rem 3rem', maxWidth: '920px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            border: '1px solid rgba(139,92,246,0.34)',
            background: 'rgba(139,92,246,0.1)',
            backdropFilter: 'blur(10px)',
            marginBottom: '1.5rem',
            fontSize: '0.8rem',
            color: '#d2c5ff',
            fontWeight: 500,
            letterSpacing: '0.05em',
          }}
        >
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#06b6d4',
            display: 'inline-block',
            boxShadow: '0 0 8px #06b6d4',
          }} />
          AutoML platform with real-time predictions
        </motion.div>

        <h1 style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.08, margin: '0 0 1.4rem', fontFamily: "'Poppins'" }}>
          {HEADLINE.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.08, duration: 0.45, ease: 'easeOut' }}
              style={{
                display: 'inline-block',
                marginRight: '0.3em',
                background: (word === 'AI' || word === '&')
                  ? 'linear-gradient(135deg, #8b5cf6, #06b6d4)'
                  : 'linear-gradient(135deg, #ffffff, #d8d0ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.45 }}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            All in One Platform
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          style={{
            fontSize: 'clamp(1rem, 2.4vw, 1.16rem)',
            color: 'rgba(255,255,255,0.62)',
            maxWidth: '620px',
            margin: '0 auto 2.4rem',
            lineHeight: 1.72,
            fontWeight: 400,
          }}
        >
          Upload data, explore insights, train models, and get predictions instantly.
          Powered by XGBoost, CatBoost, and a cleaner AutoML workflow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2, boxShadow: '0 0 36px rgba(139,92,246,0.42)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onNavigateToApp}
            id="hero-get-started"
            style={{
              padding: '0.95rem 2.2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              color: '#fff',
              fontFamily: "'Poppins'",
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 18px 36px rgba(139,92,246,0.22)',
            }}
          >
            Get Started
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2, borderColor: '#06b6d4', boxShadow: '0 0 24px rgba(6,182,212,0.18)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const el = document.querySelector('#demo')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            id="hero-try-demo"
            style={{
              padding: '0.95rem 2rem',
              borderRadius: '16px',
              border: '1px solid rgba(6,182,212,0.32)',
              background: 'rgba(6,182,212,0.08)',
              color: '#67e8f9',
              fontFamily: "'Poppins'",
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
          >
            View Demo
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}
        >
          {[['10K+', 'Models Trained'], ['98.2%', 'Accuracy Rate'], ['< 1s', 'Prediction Speed']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.65rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {val}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.42)', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>SCROLL</span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(139,92,246,0.5), transparent)' }} />
      </motion.div>
    </section>
  )
}
