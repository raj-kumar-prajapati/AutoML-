import React from 'react'
import { motion } from 'framer-motion'

const FOOTER_LINKS = {
  Product: ['Features', 'Demo', 'Pricing', 'Roadmap'],
  Resources: ['Documentation', 'API Reference', 'Blog', 'Case Studies'],
  Company: ['About', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

const SOCIAL_ICONS = [
  { label: 'GitHub', icon: 'GH', href: '#' },
  { label: 'Twitter', icon: 'X', href: '#' },
  { label: 'LinkedIn', icon: 'in', href: '#' },
  { label: 'Discord', icon: 'D', href: '#' },
]

export default function FooterSection() {
  return (
    <footer style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <div>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', cursor: 'pointer' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', fontWeight: 800, color: '#fff',
                boxShadow: '0 0 20px rgba(139,92,246,0.28)',
              }}>NF</div>
              <span style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: '1.1rem', background: 'linear-gradient(90deg, #e2d9f3, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                NeuralForge
              </span>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.86rem', lineHeight: 1.75, maxWidth: '280px', marginBottom: '1.5rem' }}>
              The all-in-one ML platform for data scientists, analysts, and builders who want a faster path to production.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {SOCIAL_ICONS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  whileHover={{ scale: 1.08, y: -2 }}
                  aria-label={s.label}
                  style={{
                    width: '38px', height: '38px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.72)', textDecoration: 'none',
                    cursor: 'pointer', transition: 'border-color 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139,92,246,0.42)'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.72)'
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <div style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                {section.toUpperCase()}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {links.map((link) => (
                  <li key={link} style={{ marginBottom: '0.65rem' }}>
                    <a
                      href="#"
                      style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => { e.target.style.color = '#a78bfa' }}
                      onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.4)' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem', margin: 0 }}>
            Copyright 2026 NeuralForge. Built by Raj Prajapati. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', animation: 'pulse 2s ease infinite' }} />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>All systems operational</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media (max-width: 900px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
