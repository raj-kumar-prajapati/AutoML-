import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const METRICS = [
  { label: 'Prediction Accuracy', value: 94.2, suffix: '%', icon: '🎯', color: '#8b5cf6', desc: 'Best-in-class model precision' },
  { label: 'Processing Speed', value: 0.8, suffix: 's', icon: '⚡', color: '#06b6d4', desc: 'Real-time inference latency' },
  { label: 'Models Supported', value: 12, suffix: '+', icon: '🤖', color: '#f59e0b', desc: 'State-of-the-art algorithms' },
  { label: 'Datasets Processed', value: 50, suffix: 'K+', icon: '📊', color: '#10b981', desc: 'Across industries & domains' },
]

const ADVANTAGES = [
  { icon: '🏆', title: 'AutoML Powered', desc: 'Automatically selects and tunes the best algorithm for your data, no ML expertise required.' },
  { icon: '🔒', title: 'Enterprise Security', desc: 'Session isolation, encrypted transfers, and zero data retention after processing.' },
  { icon: '🌐', title: 'Cloud Native', desc: 'Scales infinitely — from a single CSV to millions of rows, instantly.' },
  { icon: '📱', title: 'API Ready', desc: 'RESTful API for seamless integration with any application or workflow.' },
]

function AnimatedCounter({ target, suffix, color, duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const tick = () => {
      const elapsed = (Date.now() - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(+(target * eased).toFixed(1))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return <span ref={ref} style={{ color }}>{count}{suffix}</span>
}

export default function WhyUsSection() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true })

  return (
    <section id="why-us" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 2 }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.3rem 1rem', borderRadius: '100px',
              border: '1px solid rgba(16,185,129,0.3)',
              background: 'rgba(16,185,129,0.08)',
              marginBottom: '1rem',
              fontSize: '0.8rem', color: '#34d399', fontWeight: 500,
            }}
          >
            💎 WHY NEURALFORGE
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Poppins'", fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              background: 'linear-gradient(135deg, #fff, #34d399)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}
          >
            Performance That Sets Us Apart
          </motion.h2>
        </div>

        {/* Metrics row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem',
        }}>
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              style={{
                background: `linear-gradient(135deg, ${m.color}10, rgba(255,255,255,0.02))`,
                border: `1px solid ${m.color}25`,
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow top */}
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '60%', height: '2px',
                background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`,
              }} />

              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{m.icon}</div>
              <div style={{
                fontFamily: "'Poppins'", fontWeight: 900, fontSize: '2.5rem',
                marginBottom: '0.25rem',
              }}>
                <AnimatedCounter target={m.value} suffix={m.suffix} color={m.color} />
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.3rem' }}>{m.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{m.desc}</div>

              {/* Progress bar */}
              <div style={{ marginTop: '1.25rem', height: '3px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${(m.value / (m.value > 50 ? m.value : 100)) * 100}%` } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1.5, ease: 'easeOut' }}
                  style={{ height: '100%', borderRadius: '3px', background: `linear-gradient(90deg, ${m.color}, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advantages grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {ADVANTAGES.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              style={{
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '1.25rem',
              }}
            >
              <div style={{
                fontSize: '1.5rem',
                width: '44px', height: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(139,92,246,0.1)',
                borderRadius: '12px',
                flexShrink: 0,
              }}>
                {a.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.3rem', color: '#e2d9f3' }}>{a.title}</div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{a.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
