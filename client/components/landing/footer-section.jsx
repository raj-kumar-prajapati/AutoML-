import Link from 'next/link'
import { footerColumns, socialLinks } from '../../lib/landing-content'
import BrandLogo from './brand-logo'
import { GithubIcon, LinkedinIcon, TwitterIcon } from './icons'

const SOCIAL_ICONS = {
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
}

export default function FooterSection() {
  return (
    <footer className="px-4 pb-10 pt-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel relative overflow-hidden rounded-[38px] border border-white/10 px-6 py-8 md:px-8 md:py-10">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(79,229,255,0.82),transparent)]" />
          <div className="grid gap-8 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[0.72rem] uppercase tracking-[0.28em] text-cyan-100/75">
                Ready to launch
              </div>
              <h2 className="mt-5 max-w-2xl font-[family:var(--font-display)] text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                Bring your entire ML workflow into one premium platform.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/60">
                Start experimenting in minutes, keep release quality high, and give every stakeholder a clearer picture of what the models are doing.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/app"
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#53b6ff,#7b61ff_55%,#b170ff)] px-6 py-3.5 text-base font-semibold text-slate-950 shadow-[0_18px_44px_rgba(82,182,255,0.28)] transition hover:-translate-y-0.5"
              >
                Get Started
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-base font-semibold text-white/80 transition hover:border-cyan-300/30 hover:text-white"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-10 rounded-[34px] border border-white/10 bg-white/[0.03] px-6 py-8 backdrop-blur md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <BrandLogo />
            <p className="max-w-sm text-sm leading-7 text-white/52">
              ModelForge helps teams upload data, automate training, compare models, and ship deployments from one elegant workspace.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = SOCIAL_ICONS[link.icon]

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition hover:border-cyan-300/30 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/42">
                  {column.title}
                </h3>
                <div className="mt-5 space-y-4">
                  {column.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block text-sm text-white/58 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-white/36 md:flex-row md:items-center md:justify-between">
          <div>© 2026 ModelForge. Designed for high-performance ML teams.</div>
          <div>Modern AutoML SaaS landing page built with Next.js, Tailwind, Framer Motion, and React Three Fiber.</div>
        </div>
      </div>
    </footer>
  )
}
