import { PackageSearch, Route, TrendingUp, Waypoints } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: PackageSearch,
    title: 'Source with intent',
    description: 'We align product, pricing, and sourcing before scaling.',
    tone: 'text-sky-400',
  },
  {
    number: '02',
    icon: Waypoints,
    title: 'Launch the right channels',
    description: 'We choose the right channels based on demand and margins.',
    tone: 'text-violet-400',
  },
  {
    number: '03',
    icon: Route,
    title: 'Orchestrate inventory',
    description: 'We structure inventory and operations to support growth.',
    tone: 'text-emerald-400',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Measure and expand',
    description: 'We track performance and expand what works.',
    tone: 'text-fuchsia-400',
  },
]

export function HowWeWork() {
  return (
    <section id="how-we-work" className="scroll-mt-28 py-16 sm:py-20">
      <div className="section-shell">
        <div className="glass-panel relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12">
          <div className="ambient-orb right-0 top-6 h-40 w-40 bg-violet-500/[0.14]" />
          <div className="ambient-orb left-10 bottom-0 h-36 w-36 bg-sky-400/[0.08]" style={{ animationDelay: '1.2s' }} />
          <div className="mx-auto max-w-3xl text-center">
            <div className="section-badge">
              <span>Operating Model</span>
            </div>
            <h2 className="font-display mt-6 text-4xl text-white sm:text-5xl">
              A system that <span className="gradient-text">actually scales</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              A simple, structured process that keeps growth predictable, not chaotic.
            </p>
          </div>

          <div className="relative mt-12">
            <div className="soft-divider absolute left-8 right-8 top-10 hidden lg:block" />

            <div className="grid gap-6 lg:grid-cols-4">
              {steps.map((step) => {
                const Icon = step.icon

                return (
                  <article key={step.number} className="glass-card group relative rounded-[1.5rem] p-6">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] font-mono text-sm font-semibold text-slate-100">
                            {step.number}
                          </div>
                          <span className="text-[0.68rem] uppercase tracking-[0.32em] text-slate-500">Step</span>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition group-hover:bg-white/[0.05]">
                          <Icon className={`h-5 w-5 ${step.tone}`} />
                        </div>
                      </div>

                      <h3 className="font-display mt-8 text-2xl text-white">{step.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-slate-300">{step.description}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
