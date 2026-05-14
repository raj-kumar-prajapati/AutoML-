import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const barData = [
  { model: 'XGBoost', accuracy: 94.2, f1: 91.8 },
  { model: 'CatBoost', accuracy: 92.7, f1: 90.1 },
  { model: 'RF', accuracy: 89.4, f1: 87.2 },
  { model: 'LightGBM', accuracy: 91.5, f1: 89.0 },
  { model: 'SVM', accuracy: 85.3, f1: 82.6 },
]

const lineData = [
  { epoch: 1, train: 0.72, val: 0.68 },
  { epoch: 5, train: 0.83, val: 0.79 },
  { epoch: 10, train: 0.88, val: 0.85 },
  { epoch: 15, train: 0.91, val: 0.89 },
  { epoch: 20, train: 0.94, val: 0.92 },
]

const pieData = [
  { name: 'Training', value: 60 },
  { name: 'Validation', value: 20 },
  { name: 'Testing', value: 20 },
]
const PIE_COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b']

const CHART_STYLE = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '16px',
  padding: '1.25rem',
}

const TOOLTIP_STYLE = {
  contentStyle: {
    background: 'rgba(10,5,30,0.95)',
    border: '1px solid rgba(139,92,246,0.3)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '0.8rem',
  },
}

const METRICS = [
  { label: 'Best Accuracy', value: '94.2%', icon: '🎯', color: '#8b5cf6' },
  { label: 'F1 Score', value: '91.8', icon: '📈', color: '#06b6d4' },
  { label: 'Training Time', value: '2.4s', icon: '⚡', color: '#f59e0b' },
  { label: 'Features Used', value: '18', icon: '🔢', color: '#10b981' },
]

export default function DemoSection({ onNavigateToApp }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="demo" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.3rem 1rem', borderRadius: '100px',
              border: '1px solid rgba(6,182,212,0.3)',
              background: 'rgba(6,182,212,0.08)',
              marginBottom: '1rem',
              fontSize: '0.8rem', color: '#67e8f9', fontWeight: 500,
            }}
          >
            📊 LIVE DASHBOARD PREVIEW
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Poppins'", fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              background: 'linear-gradient(135deg, #fff, #67e8f9)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}
          >
            See Your Models in Action
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 }}
            style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center' }}
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2, boxShadow: '0 0 28px rgba(139,92,246,0.32)' }}
              whileTap={{ scale: 0.98 }}
              onClick={onNavigateToApp}
              style={{
                padding: '0.9rem 1.4rem',
                borderRadius: '14px',
                border: '1px solid rgba(139,92,246,0.24)',
                background: 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(6,182,212,0.12))',
                color: '#f5f3ff',
                fontFamily: "'Poppins'",
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
              }}
            >
              Open Full App
            </motion.button>
          </motion.div>
        </div>

        {/* Dashboard frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(139,92,246,0.2)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(139,92,246,0.15), 0 0 120px rgba(6,182,212,0.05)',
          }}
        >
          {/* Fake browser bar */}
          <div style={{
            padding: '0.75rem 1.25rem',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
            <div style={{
              marginLeft: '1rem', flex: 1, height: 26, borderRadius: 6,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', padding: '0 0.75rem',
              fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)',
            }}>
              🔒 neuralforge.app/dashboard
            </div>
          </div>

          <div style={{ padding: '1.5rem' }}>
            {/* Metric cards row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}>
              {METRICS.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  style={{
                    background: `linear-gradient(135deg, ${m.color}12, transparent)`,
                    border: `1px solid ${m.color}25`,
                    borderRadius: '14px',
                    padding: '1rem 1.25rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{m.icon}</span>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: m.color, fontFamily: "'Poppins'" }}>{m.value}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)' }}>{m.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {/* Bar chart */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                style={CHART_STYLE}
              >
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem', fontWeight: 500 }}>Model Comparison — Accuracy</div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="model" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[80, 100]} tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip {...TOOLTIP_STYLE} />
                    <Bar dataKey="accuracy" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="f1" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Line chart */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                style={CHART_STYLE}
              >
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem', fontWeight: 500 }}>Training Loss Curve</div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="epoch" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0.6, 1]} tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip {...TOOLTIP_STYLE} />
                    <Line type="monotone" dataKey="train" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="val" stroke="#06b6d4" strokeWidth={2.5} dot={false} strokeDasharray="5 3" />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Pie chart */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                style={{ ...CHART_STYLE, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem', fontWeight: 500, alignSelf: 'flex-start' }}>Dataset Split</div>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                      {pieData.map((_, idx) => (
                        <Cell key={idx} fill={PIE_COLORS[idx]} />
                      ))}
                    </Pie>
                    <Tooltip {...TOOLTIP_STYLE} />
                    <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }} />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
