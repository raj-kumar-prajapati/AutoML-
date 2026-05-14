import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  { id: 1, icon: '📂', label: 'Upload', desc: 'Drop your CSV dataset', color: '#8b5cf6' },
  { id: 2, icon: '🔍', label: 'Explore', desc: 'Auto-generate statistics', color: '#06b6d4' },
  { id: 3, icon: '📊', label: 'Visualize', desc: 'Charts & heatmaps', color: '#a78bfa' },
  { id: 4, icon: '🤖', label: 'Train', desc: 'XGBoost, CatBoost & more', color: '#f59e0b' },
  { id: 5, icon: '🎯', label: 'Predict', desc: 'Instant predictions', color: '#10b981' },
]

export default function WorkflowSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="workflow" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 2 }}>
      {/* Subtle divider */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.3rem 1rem', borderRadius: '100px',
              border: '1px solid rgba(167,139,250,0.3)',
              background: 'rgba(167,139,250,0.08)',
              marginBottom: '1rem',
              fontSize: '0.8rem', color: '#c4b5fd', fontWeight: 500,
            }}
          >
            🚀 HOW IT WORKS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Poppins'", fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              background: 'linear-gradient(135deg, #fff, #c4b5fd)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}
          >
            5-Step ML Pipeline
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: '480px', margin: '0.75rem auto 0' }}
          >
            From raw data to production-ready predictions in minutes, not days.
          </motion.p>
        </div>

        {/* Workflow steps */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 0,
          flexWrap: 'wrap',
          rowGap: '2rem',
        }}>
          {STEPS.map((step, i) => (
            <React.Fragment key={step.id}>
              {/* Step */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '180px', textAlign: 'center' }}
              >
                {/* Step circle */}
                <motion.div
                  whileHover={{ scale: 1.06, boxShadow: `0 0 28px ${step.color}45` }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
                    border: `2px solid ${step.color}60`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem',
                    boxShadow: `0 0 20px ${step.color}30`,
                    position: 'relative',
                    cursor: 'default',
                  }}
                >
                  {step.icon}
                  {/* Step number */}
                  <div style={{
                    position: 'absolute', top: -6, right: -6,
                    width: 22, height: 22, borderRadius: '50%',
                    background: step.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 800, color: '#fff',
                  }}>
                    {step.id}
                  </div>
                </motion.div>

                <div style={{ marginTop: '1rem' }}>
                  <div style={{
                    fontFamily: "'Poppins'", fontWeight: 700, fontSize: '1rem',
                    color: step.color, marginBottom: '0.3rem',
                  }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', maxWidth: '130px', margin: '0 auto' }}>
                    {step.desc}
                  </div>
                </div>
              </motion.div>

              {/* Connector */}
              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', paddingTop: '34px',
                    transformOrigin: 'left center',
                  }}
                >
                  <svg width="60" height="20" viewBox="0 0 60 20">
                    <defs>
                      <linearGradient id={`cg${i}`} x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0" stopColor={STEPS[i].color} stopOpacity="0.6" />
                        <stop offset="1" stopColor={STEPS[i + 1].color} stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="10" x2="48" y2="10" stroke={`url(#cg${i})`} strokeWidth="2" strokeDasharray="6 3" />
                    <polygon points="50,10 43,6 43,14" fill={STEPS[i + 1].color} opacity="0.7" />
                  </svg>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
