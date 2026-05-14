import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Lead Data Scientist @ TechVenture',
    avatar: '👩‍💻',
    rating: 5,
    text: 'NeuralForge cut our model deployment time from 2 weeks to 2 hours. The AutoML pipeline is genuinely impressive — it outperformed models our team spent days tuning.',
    company: 'TechVenture AI',
    color: '#8b5cf6',
  },
  {
    name: 'Arjun Mehta',
    role: 'ML Engineer @ DataScale',
    avatar: '👨‍🔬',
    rating: 5,
    text: 'The XGBoost + CatBoost comparison is flawless. I uploaded a 500K row dataset and had predictions in under 3 minutes. Never going back to Jupyter notebooks.',
    company: 'DataScale Inc.',
    color: '#06b6d4',
  },
  {
    name: 'Sarah Chen',
    role: 'Product Manager @ Nexus Corp',
    avatar: '👩‍💼',
    rating: 5,
    text: "As a PM, I needed something non-technical I could hand to analysts. NeuralForge is exactly that — powerful enough for data scientists, simple enough for everyone else.",
    company: 'Nexus Corp',
    color: '#f59e0b',
  },
  {
    name: 'Rahul Gupta',
    role: 'Co-Founder @ Predicto',
    avatar: '🧑‍🚀',
    rating: 5,
    text: "We built our MVP around NeuralForge's pipeline. The visualization and exploration features alone saved us 3 weeks of engineering work. Absolute game-changer.",
    company: 'Predicto Labs',
    color: '#10b981',
  },
]

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#f59e0b', fontSize: '0.85rem' }}>★</span>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="testimonials" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 2 }}>
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.3rem 1rem', borderRadius: '100px',
              border: '1px solid rgba(245,158,11,0.3)',
              background: 'rgba(245,158,11,0.08)',
              marginBottom: '1rem',
              fontSize: '0.8rem', color: '#fbbf24', fontWeight: 500,
            }}
          >
            📢 TRUSTED BY BUILDERS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Poppins'", fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              background: 'linear-gradient(135deg, #fff, #fbbf24)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}
          >
            What Our Users Are Saying
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', maxWidth: '440px', margin: '0.75rem auto 0' }}
          >
            Trusted by data teams at fast-growing startups and enterprises.
          </motion.p>
        </div>

        {/* Testimonials grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12 }}
              whileHover={{ y: -6, boxShadow: `0 20px 50px ${t.color}30` }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '1.75rem',
                backdropFilter: 'blur(10px)',
                cursor: 'default',
                transition: 'box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, ${t.color}, transparent)`,
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <Stars count={t.rating} />
                <span style={{
                  fontSize: '0.65rem', color: t.color,
                  background: `${t.color}15`, border: `1px solid ${t.color}30`,
                  padding: '2px 8px', borderRadius: '100px', fontWeight: 600,
                }}>
                  {t.company}
                </span>
              </div>

              <p style={{
                color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem',
                lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic',
              }}>
                "{t.text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${t.color}40, ${t.color}20)`,
                  border: `1px solid ${t.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem',
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: '3rem', textAlign: 'center',
            display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap',
          }}
        >
          {[['⭐ 4.9/5', 'Average Rating'], ['10K+', 'Active Users'], ['99.2%', 'Uptime SLA']].map(([val, lbl]) => (
            <div key={lbl} style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#c4b5fd' }}>{val}</span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{lbl}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
