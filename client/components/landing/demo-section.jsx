'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { demoScenarios } from '../../lib/landing-content'
import InteractiveCard from './interactive-card'
import SectionHeading from './section-heading'

export default function DemoSection() {
  const [activeId, setActiveId] = useState(demoScenarios[0].id)
  const activeScenario = useMemo(
    () => demoScenarios.find((item) => item.id === activeId) ?? demoScenarios[0],
    [activeId],
  )

  return (
    <section id="demo" className="px-4 py-20 md:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl space-y-14">
        <SectionHeading
          eyebrow="Interactive preview"
          title="A polished command center for modern ML operations."
          description="Instead of stitching together notebooks, dashboards, and release checklists, teams can see the entire lifecycle in one responsive workspace."
        />

        <div className="grid gap-6 lg:grid-cols-[0.38fr_0.62fr]">
          <div className="space-y-4">
            {demoScenarios.map((scenario) => {
              const active = scenario.id === activeId

              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setActiveId(scenario.id)}
                  className={`glass-panel w-full rounded-[28px] border p-5 text-left transition ${
                    active ? 'border-cyan-300/30 bg-cyan-300/10' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-[0.72rem] uppercase tracking-[0.28em] text-white/35">
                    {scenario.label}
                  </div>
                  <div className="mt-2 font-[family:var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-white">
                    {scenario.eyebrow}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/58">
                    {scenario.summary}
                  </p>
                </button>
              )
            })}
          </div>

          <InteractiveCard glow="rgba(79, 229, 255, 0.18)">
            <div className="glass-panel relative overflow-hidden rounded-[34px] border border-white/10 p-6 md:p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(123,97,255,0.8),transparent)]" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xl">
                      <div className="text-[0.72rem] uppercase tracking-[0.28em] text-cyan-100/60">
                        {activeScenario.eyebrow}
                      </div>
                      <h3 className="mt-3 font-[family:var(--font-display)] text-3xl font-semibold tracking-[-0.04em] text-white">
                        {activeScenario.title}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-white/60">
                        {activeScenario.summary}
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/55">
                      Scenario: <span className="font-semibold text-white">{activeScenario.label}</span>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {activeScenario.kpis.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[26px] border border-white/10 bg-white/[0.04] px-5 py-5"
                      >
                        <div className="text-sm text-white/45">{item.label}</div>
                        <div className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[0.56fr_0.44fr]">
                    <div className="rounded-[30px] border border-white/10 bg-[#0b1430]/80 p-5">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-white/45">Performance trajectory</div>
                        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">
                          Auto-updating
                        </div>
                      </div>

                      <div className="mt-8 flex h-56 items-end gap-3">
                        {activeScenario.chart.map((value, index) => (
                          <motion.div
                            key={`${activeScenario.id}-${value}`}
                            initial={{ height: 0 }}
                            animate={{ height: `${value}%` }}
                            transition={{ delay: index * 0.05, duration: 0.45 }}
                            className="flex-1 rounded-t-[20px] bg-[linear-gradient(180deg,rgba(79,229,255,0.95),rgba(123,97,255,0.45))]"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5">
                      <div className="text-sm text-white/45">Pipeline modules</div>
                      <div className="mt-6 space-y-4">
                        {activeScenario.modules.map((item, index) => (
                          <div
                            key={item}
                            className="flex items-start gap-4 rounded-[22px] border border-white/8 bg-white/[0.02] p-4"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                              0{index + 1}
                            </div>
                            <div className="text-sm leading-7 text-white/62">{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </section>
  )
}
