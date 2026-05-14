import { motion } from 'framer-motion'
import { featureCards } from '../../lib/landing-content'
import InteractiveCard from './interactive-card'
import SectionHeading from './section-heading'
import { BrainIcon, LayersIcon, RocketIcon, SparkIcon } from './icons'

const ICONS = {
  spark: SparkIcon,
  layers: LayersIcon,
  brain: BrainIcon,
  rocket: RocketIcon,
}

export default function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20 md:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl space-y-14">
        <SectionHeading
          eyebrow="Core capabilities"
          title="Automation that feels premium, not generic."
          description="The platform was designed for teams who want more signal with less setup. Every surface is built to reduce operational drag without sacrificing control."
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((feature, index) => {
            const Icon = ICONS[feature.icon]

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
              >
                <InteractiveCard className="h-full" glow="rgba(123, 97, 255, 0.2)">
                  <div className="glass-panel flex h-full flex-col rounded-[30px] border border-white/10 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/55">
                        {feature.metric}
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      <h3 className="font-[family:var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-7 text-white/58">
                        {feature.description}
                      </p>
                    </div>

                    <div className="mt-8 h-px bg-[linear-gradient(90deg,rgba(79,229,255,0.5),transparent)]" />
                  </div>
                </InteractiveCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
