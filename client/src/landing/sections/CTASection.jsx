import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTASection({ onNavigateToApp }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="cta" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 2 }} ref={ref}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(6,182,212,0.08))',
            border: '1px solid rgba(139,92,246,0.22)',
            borderRadius: '32px',
            padding: 'clamp(3rem, 6vw, 4.5rem) 2rem',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(18px)',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '560px',
            height: '280px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.34rem 1rem',
                borderRadius: '999px',
                border: '1px solid rgba(139,92,246,0.34)',
                background: 'rgba(139,92,246,0.12)',
                marginBottom: '1.4rem',
                fontSize: '0.8rem',
                color: '#c4b5fd',
                fontWeight: 600,
              }}
            >
              Start for free
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              style={{
                fontFamily: "'Poppins'",
                fontWeight: 900,
                fontSize: 'clamp(2rem, 5vw, 3.4rem)',
                lineHeight: 1.08,
                margin: '0 0 1.25rem',
              }}
            >
              <span style={{ background: 'linear-gradient(135deg, #fff, #e2d9f3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Start Building AI Models
              </span>
              <br />
              <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Today.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              style={{ color: 'rgba(255,255,255,0.56)', fontSize: '1.05rem', margin: '0 auto 2.4rem', maxWidth: '500px', lineHeight: 1.65 }}
            >
              Join teams who want a faster path from raw data to production-ready predictions without changing how the product feels.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2, boxShadow: '0 0 40px rgba(139,92,246,0.45)' }}
                whileTap={{ scale: 0.98 }}
                onClick={onNavigateToApp}
                id="cta-main-button"
                style={{
                  padding: '1rem 2.35rem',
                  borderRadius: '16px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                  color: '#fff',
                  fontFamily: "'Poppins'",
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 18px 36px rgba(139,92,246,0.2)',
                }}
              >
                Launch Platform
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const el = document.querySelector('#demo')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                id="cta-demo-button"
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.14)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'rgba(255,255,255,0.82)',
                  fontFamily: "'Poppins'",
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                }}
              >
                View Live Demo
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 }}
              style={{ color: 'rgba(255,255,255,0.34)', fontSize: '0.78rem', marginTop: '1.4rem' }}
            >
              No setup required - Upload and predict in minutes - Cancel anytime
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
