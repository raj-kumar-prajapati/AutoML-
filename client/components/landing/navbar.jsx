'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BrandLogo from './brand-logo'
import { CloseIcon, MenuIcon } from './icons'
import { navLinks } from '../../lib/landing-content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="sticky top-0 z-50 px-4 pt-4 md:px-6 lg:px-8">
      <motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-[28px] border px-5 py-4 transition duration-300 md:px-6 ${
          scrolled
            ? 'glass-panel border-white/10 shadow-[0_20px_60px_rgba(2,6,23,0.5)]'
            : 'border-white/5 bg-white/[0.03]'
        }`}
      >
        <Link href="/" aria-label="ModelForge home">
          <BrandLogo compact />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/60 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="#demo"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-cyan-300/30 hover:text-white"
          >
            View Demo
          </Link>
          <Link
            href="/app"
            className="rounded-full bg-[linear-gradient(135deg,#53b6ff,#7b61ff_55%,#b170ff)] px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_14px_40px_rgba(82,182,255,0.28)] transition hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0a1024]/95 backdrop-blur lg:hidden"
          >
            <div className="flex flex-col gap-2 px-5 py-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/app"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-2xl bg-[linear-gradient(135deg,#53b6ff,#7b61ff_55%,#b170ff)] px-4 py-3 text-center text-sm font-semibold text-slate-950"
              >
                Launch Dashboard
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
