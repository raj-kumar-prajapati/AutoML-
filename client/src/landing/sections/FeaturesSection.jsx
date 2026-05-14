import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  {
    icon: '📂',
    title: 'Dataset Upload',
    desc: 'Drag & drop CSV files. Instant parsing, validation, and smart type inference.',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.3)',
  },
  {
    icon: '🔍',
    title: 'Data Exploration',
    desc: 'Auto-generated statistics, distributions, correlation heatmaps, and outlier detection.',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.3)',
  },
  {
    icon: '📊',
    title: 'Smart Visualization',
    desc: 'Interactive charts, heatmaps, and pair plots. Powered by Plotly.',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.3)',
  },
  {
    icon: '🤖',
    title: 'ML Models',
    desc: 'XGBoost, CatBoost, Random Forest, LightGBM — all with hyperparameter tuning.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
  },
  {
    icon: '⚡',
    title: 'Auto Model Selection',
    desc: 'Automatically benchmark and select the best model for your task — regression or classification.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.3)',
  },
  {
    icon: '🎯',
    title: 'Predictions & Download',
    desc: 'Generate batch predictions and download results as CSV with a single click.',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.3)',
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -5
    const rotY = ((x - cx) / cx) * 5
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.015)`
    card.style.boxShadow = `0 16px 40px ${feature.glow}, 0 0 18px ${feature.glow}`
    card.style.borderColor = feature.color
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
      cardRef.current.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)'
      cardRef.current.style.borderColor = 'rgba(255,255,255,0.07)'
    }
  }

  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px',
          padding: '2rem',
          cursor: 'default',
          transition: 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          height: '100%',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{
          width: '56px', height: '56px', borderRadius: '16px',
          background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}11)`,
          border: `1px solid ${feature.color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.75rem', marginBottom: '1.25rem',
          boxShadow: `0 0 20px ${feature.glow}`,
        }}>
          {feature.icon}
        </div>

        <h3 style={{
          fontFamily: "'Poppins'", fontWeight: 700, fontSize: '1.1rem',
          marginBottom: '0.6rem',
          background: `linear-gradient(135deg, #fff, ${feature.color})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {feature.title}
        </h3>

        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
          {feature.desc}
        </p>

        {/* Bottom accent line */}
        <div style={{
          marginTop: '1.5rem', height: '2px', borderRadius: '2px',
          background: `linear-gradient(90deg, ${feature.color}, transparent)`,
          opacity: 0.4,
        }} />
      </div>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="features" style={{ padding: '8rem 2rem 6rem', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.3rem 1rem', borderRadius: '100px',
              border: '1px solid rgba(139,92,246,0.3)',
              background: 'rgba(139,92,246,0.08)',
              marginBottom: '1rem',
              fontSize: '0.8rem', color: '#a78bfa', fontWeight: 500, letterSpacing: '0.05em',
            }}
          >
            ⚡ FEATURES
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              fontFamily: "'Poppins'", fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              background: 'linear-gradient(135deg, #fff 40%, #a78bfa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
            }}
          >
            Everything You Need to Build AI
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto' }}
          >
            A complete end-to-end ML pipeline from raw data to deployed predictions.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
          gap: '1.5rem',
        }}>
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
