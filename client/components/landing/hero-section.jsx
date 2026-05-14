'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { heroStats, trustedBy } from '../../lib/landing-content'
import { ArrowRightIcon, PlayIcon } from './icons'

const HeroScene = dynamic(() => import('./hero-scene'), { ssr: false })

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-8 md:px-6 md:pb-24 lg:px-8 lg:pb-28 lg:pt-10">
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-x-0 top-0 h-[72rem] bg-[radial-gradient(circle_at_top,rgba(123,97,255,0.32),transparent_34%),radial-gradient(circle_at_72%_18%,rgba(79,229,255,0.18),transparent_22%)]" />
        <div className="grid-overlay absolute inset-0 opacity-60" />
        <div className="noise-overlay absolute inset-0 opacity-20" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[52rem] mask-fade-bottom">
        <HeroScene />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.32em] text-cyan-100/90 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(79,229,255,0.75)]" />
            AI SaaS for high-velocity ML teams
          </div>

          <div className="max-w-3xl space-y-7">
            <h1 className="font-[family:var(--font-display)] text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              Build ML Models Automatically
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-white/65 md:text-xl">
              ModelForge turns raw data into production-ready machine learning with automated training,
              feature engineering, model evaluation, and deployment workflows inside one polished platform.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/app"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,#53b6ff,#7b61ff_55%,#b170ff)] px-6 py-3.5 text-base font-semibold text-slate-950 shadow-[0_18px_44px_rgba(82,182,255,0.28)] transition hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-base font-semibold text-white/80 transition hover:border-cyan-300/30 hover:bg-white/10 hover:text-white"
              >
                <PlayIcon className="h-4 w-4" />
                View Demo
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 * index + 0.2, duration: 0.55 }}
                className="glass-panel rounded-[26px] px-5 py-5"
              >
                <div className="text-2xl font-semibold tracking-[-0.05em] text-white md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm leading-6 text-white/50">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 space-y-4">
            <p className="text-[0.72rem] uppercase tracking-[0.34em] text-white/35">
              Trusted by modern product, data, and platform teams
            </p>
            <div className="flex flex-wrap gap-3">
              {trustedBy.map((company) => (
                <div
                  key={company}
                  className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-white/55"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.75, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute -left-8 top-12 hidden h-28 w-28 rounded-full bg-cyan-400/20 blur-3xl lg:block" />
          <div className="absolute -right-8 top-0 hidden h-32 w-32 rounded-full bg-violet-500/20 blur-3xl lg:block" />

          <div className="glass-panel hero-glow relative overflow-hidden rounded-[34px] border border-white/10 p-5 md:p-6">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(79,229,255,0.8),transparent)]" />

            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.3em] text-cyan-200/70">
                  Live command center
                </p>
                <h2 className="mt-2 font-[family:var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-white">
                  AutoML Pipeline Preview
                </h2>
              </div>
              <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100/80">
                Live
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[28px] border border-white/10 bg-[#0b1430]/80 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/45">Model leaderboard</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                    Updated 2m ago
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    ['CatBoost', '98.2%', 'bg-cyan-300'],
                    ['XGBoost', '96.8%', 'bg-violet-400'],
                    ['Random Forest', '94.4%', 'bg-white/40'],
                  ].map(([name, score, color]) => (
                    <div key={name} className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-white">{name}</div>
                        <div className="text-sm text-white/55">{score}</div>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-white/5">
                        <div className={`h-full rounded-full ${color}`} style={{ width: score }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-sm text-white/45">Pipeline status</div>
                  <div className="mt-5 space-y-4">
                    {[
                      ['Upload Data', 'Complete'],
                      ['Engineer Features', 'Running'],
                      ['Model Selection', 'Queued'],
                    ].map(([label, status]) => (
                      <div key={label} className="flex items-center justify-between gap-3">
                        <span className="text-sm text-white/70">{label}</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(83,182,255,0.12),rgba(123,97,255,0.12))] p-5">
                  <div className="text-sm text-white/50">Release recommendation</div>
                  <div className="mt-3 font-[family:var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-white">
                    Ship CatBoost v2.4
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    Highest validation score, stable drift profile, and monitoring alerts already configured.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
