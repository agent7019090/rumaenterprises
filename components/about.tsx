import { Boxes, ChartNoAxesColumnIncreasing, ShieldCheck, Users } from 'lucide-react'

const strengths = [
  {
    icon: ShieldCheck,
    title: 'Execution you can trust',
    description: 'We keep strategy tied to delivery, so progress is visible and dependable from day one.',
    tone: 'text-emerald-400',
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: 'Growth with discipline',
    description: 'Every move is framed around scalable distribution, margin awareness, and operational fit.',
    tone: 'text-violet-400',
  },
  {
    icon: Boxes,
    title: 'Connected operations',
    description: 'Sourcing, inventory, and fulfillment are handled as one system instead of disconnected tasks.',
    tone: 'text-sky-400',
  },
  {
    icon: Users,
    title: 'Clear collaboration',
    description: 'Communication stays direct, practical, and aligned with the business outcomes that matter.',
    tone: 'text-fuchsia-400',
  },
]

const focusAreas = ['Transparent supply coordination', 'Marketplace-ready workflows', 'Professional distribution support']

export function About() {
  return (
    <section id="about" className="scroll-mt-28 py-16 sm:py-20">
      <div className="section-shell">
        <div className="ambient-orb left-0 top-1/4 h-44 w-44 bg-emerald-400/[0.08]" />
        <div className="ambient-orb right-8 top-8 h-40 w-40 bg-violet-500/[0.1]" style={{ animationDelay: '1.2s' }} />
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
            <div className="section-badge">
              <span>Why Ruma</span>
            </div>
            <h2 className="font-display mt-6 text-4xl text-white sm:text-5xl">
              Built for <span className="gradient-text">clarity, </span>not complexity
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              We simplify sourcing, distribution, and fulfillment so you can scale with confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {focusAreas.map((item) => (
                <div key={item} className="metric-chip">
                  <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {strengths.map((strength) => {
              const Icon = strength.icon

              return (
                <article key={strength.title} className="glass-card rounded-[1.6rem] p-6">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 w-fit">
                    <Icon className={`h-6 w-6 ${strength.tone}`} />
                  </div>
                  <h3 className="font-display mt-8 text-2xl text-white">{strength.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{strength.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
