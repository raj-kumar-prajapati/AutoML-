import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className={`mx-auto flex max-w-3xl flex-col gap-5 ${alignment}`}
    >
      <div className="inline-flex w-auto items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-cyan-200/80 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(79,229,255,0.72)]" />
        {eyebrow}
      </div>

      <div className="space-y-4">
        <h2 className="font-[family:var(--font-display)] text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-8 text-white/60 md:text-lg">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
