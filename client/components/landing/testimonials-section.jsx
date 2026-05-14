import Image from 'next/image'
import { motion } from 'framer-motion'
import { testimonials } from '../../lib/landing-content'
import InteractiveCard from './interactive-card'
import SectionHeading from './section-heading'

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-4 py-20 md:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl space-y-14">
        <SectionHeading
          eyebrow="Customer proof"
          title="Teams trust it because it feels as solid as the outcomes it produces."
          description="High-performing SaaS products earn confidence through polish and predictability. The feedback below reflects both."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
            >
              <InteractiveCard glow="rgba(123, 97, 255, 0.2)">
                <div className="glass-panel flex h-full flex-col rounded-[30px] border border-white/10 p-6">
                  <div className="text-[3rem] leading-none text-cyan-100/45">“</div>
                  <p className="mt-3 flex-1 text-base leading-8 text-white/64">
                    {testimonial.quote}
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-white/45">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
