export default function BrandLogo({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_12px_40px_rgba(82,182,255,0.18)] backdrop-blur">
        <div className="absolute inset-[1px] rounded-[14px] bg-[linear-gradient(145deg,rgba(123,97,255,0.28),rgba(79,229,255,0.22))]" />
        <span className="relative text-lg font-semibold text-white">A</span>
      </div>

      <div className="min-w-0">
        <div className="text-[0.72rem] uppercase tracking-[0.38em] text-white/40">
          AutoML OS
        </div>
        <div className={`font-[family:var(--font-display)] font-semibold tracking-tight ${compact ? 'text-lg' : 'text-xl'}`}>
          <span className="text-gradient-brand">ModelForge</span>
        </div>
      </div>
    </div>
  )
}
