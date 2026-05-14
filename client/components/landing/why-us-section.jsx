import { motion } from 'framer-motion'
import { advantageMetrics, comparisonRows } from '../../lib/landing-content'
import SectionHeading from './section-heading'

export default function WhyUsSection() {
  return (
    <section id="why-us" className="px-4 py-20 md:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl space-y-14">
        <SectionHeading
          eyebrow="Why ModelForge"
          title="A platform built to outperform traditional ML workflows."
          description="Traditional machine learning stacks scatter work across notebooks, dashboards, and release requests. ModelForge keeps the system cohesive so teams move faster and make fewer avoidable mistakes."
        />

        <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="space-y-6">
            {advantageMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                className="glass-panel rounded-[30px] border border-white/10 p-6"
              >
                <div className="text-[0.72rem] uppercase tracking-[0.28em] text-cyan-100/55">
                  Advantage 0{index + 1}
                </div>
                <h3 className="mt-3 font-[family:var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-white">
                  {metric.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/58">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="glass-panel overflow-hidden rounded-[34px] border border-white/10"
          >
            <div className="grid grid-cols-[1.15fr_0.85fr_0.85fr] border-b border-white/10 bg-white/[0.04] px-6 py-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
              <div>Category</div>
              <div>Traditional ML</div>
              <div>ModelForge</div>
            </div>

            <div className="divide-y divide-white/8">
              {comparisonRows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 gap-4 px-6 py-6 text-sm text-white/60 md:grid-cols-[1.15fr_0.85fr_0.85fr]"
                >
                  <div className="font-medium text-white">{row.label}</div>
                  <div>{row.traditional}</div>
                  <div className="text-cyan-100/90">{row.modelforge}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
