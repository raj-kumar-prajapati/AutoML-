import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Navbar({ onNavigateToApp }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '0 1.25rem',
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    background: scrolled ? 'rgba(2,0,16,0.78)' : 'transparent',
    backdropFilter: scrolled ? 'blur(18px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(139,92,246,0.14)' : '1px solid transparent',
    transition: 'all 0.3s ease',
  }

  const actionButtonStyle = {
    padding: '0.62rem 1.25rem',
    borderRadius: '12px',
    fontFamily: "'Poppins'",
    fontWeight: 600,
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.22s ease',
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        style={navStyle}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', cursor: 'pointer', minWidth: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(139,92,246,0.95), rgba(6,182,212,0.95))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.92rem',
            fontWeight: 800,
            color: '#fff',
            boxShadow: '0 0 22px rgba(139,92,246,0.35)',
          }}>NF</div>
          <span style={{
            fontFamily: "'Poppins'",
            fontWeight: 700,
            fontSize: '1.15rem',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(90deg, #f4edff, #67e8f9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            NeuralForge
          </span>
        </div>

        <div style={{ display: 'flex', gap: '1.8rem', alignItems: 'center' }} className="nav-desktop-links">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.92rem',
                fontFamily: "'Poppins'",
                fontWeight: 500,
                transition: 'color 0.2s ease, transform 0.2s ease',
                padding: '0.25rem 0',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#c4b5fd'
                e.target.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255,255,255,0.7)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="nav-desktop-actions" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <motion.button
              whileHover={{ scale: 1.03, y: -1, boxShadow: '0 0 28px rgba(139,92,246,0.45)' }}
              whileTap={{ scale: 0.98 }}
              onClick={onNavigateToApp}
              style={{
                ...actionButtonStyle,
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                color: '#fff',
                boxShadow: '0 16px 32px rgba(139,92,246,0.18)',
              }}
            >
              Get Started
            </motion.button>
          </div>

          <button
            type="button"
            className="nav-mobile-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
            aria-label="Toggle navigation"
          >
            {menuOpen ? 'x' : '='}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="nav-mobile-panel"
            style={{
              position: 'fixed',
              top: '72px',
              left: '1rem',
              right: '1rem',
              zIndex: 999,
              display: 'none',
              background: 'rgba(10, 6, 25, 0.94)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '18px',
              padding: '1rem',
              backdropFilter: 'blur(18px)',
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.78)',
                  padding: '0.9rem 0.25rem',
                  fontFamily: "'Poppins'",
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop-links,
          .nav-desktop-actions {
            display: none !important;
          }

          .nav-mobile-toggle,
          .nav-mobile-panel {
            display: flex !important;
          }

          .nav-mobile-panel {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
}
