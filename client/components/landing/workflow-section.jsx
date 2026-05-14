import { motion } from 'framer-motion'
import { workflowSteps } from '../../lib/landing-content'
import SectionHeading from './section-heading'

export default function WorkflowSection() {
  return (
    <section id="workflow" className="px-4 py-20 md:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl space-y-14">
        <SectionHeading
          eyebrow="Workflow"
          title="A straight path from data upload to deployment."
          description="Every stage is designed to remove friction. The workflow keeps technical depth available while making the happy path dramatically faster."
        />

        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-[linear-gradient(180deg,rgba(79,229,255,0.45),rgba(123,97,255,0.16),transparent)] lg:hidden" />
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-[linear-gradient(90deg,rgba(79,229,255,0.42),rgba(123,97,255,0.2),transparent)] lg:block" />

          <div className="grid gap-6 lg:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                className="relative"
              >
                <div className="glass-panel relative rounded-[30px] border border-white/10 p-6 lg:pt-10">
                  <div className="absolute left-[1.42rem] top-6 h-4 w-4 rounded-full border border-cyan-300/30 bg-cyan-300/20 shadow-[0_0_18px_rgba(79,229,255,0.45)] lg:left-1/2 lg:-top-2 lg:-translate-x-1/2" />

                  <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/45">
                    Step {step.number}
                  </div>

                  <h3 className="font-[family:var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/58">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
