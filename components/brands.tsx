import { ArrowUpRight, Globe2, Handshake, Layers3 } from 'lucide-react'

const readiness = [
  {
    title: 'Channel-fit planning',
    description: 'Distribution decisions tied to market timing, margin structure, and operational readiness.',
  },
  {
    title: 'Supplier coordination',
    description: 'Tighter communication between sourcing, demand, and fulfillment from the start.',
  },
  {
    title: 'Scalable execution',
    description: 'Systems shaped to support both marketplace growth and wholesale expansion cleanly.',
  },
]

const partnershipLanes = [
  {
    icon: Handshake,
    title: 'Brand onboarding',
    description: 'Structured entry into distribution relationships with clarity on positioning, channels, and pacing.',
    tone: 'text-emerald-400',
  },
  {
    icon: Globe2,
    title: 'Marketplace enablement',
    description: 'Operational support for Amazon and digital marketplaces where brand presence must stay consistent.',
    tone: 'text-sky-400',
  },
  {
    icon: Layers3,
    title: 'Fulfillment sync',
    description: 'Inventory, routing, and service coordination that keeps the backend as polished as the front end.',
    tone: 'text-fuchsia-400',
  },
]

export function Brands() {
  return (
    <section id="brands" className="scroll-mt-28 py-16 sm:py-20">
      <div className="section-shell">
        <div className="ambient-orb left-8 top-24 h-48 w-48 bg-violet-500/[0.1]" />
        <div className="ambient-orb right-8 bottom-6 h-52 w-52 bg-sky-400/[0.08]" style={{ animationDelay: '1.6s' }} />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
            <div className="ambient-orb bottom-0 right-0 h-44 w-44 bg-sky-400/[0.14]" />

            <div className="relative">
              <div className="section-badge">
                <span>Partnerships</span>
              </div>
              <h2 className="font-display mt-6 text-4xl text-white sm:text-5xl">
                Built to grow with <span className="gradient-text">you</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                We connect sourcing, marketplaces, and fulfillment so growth stays smooth as you scale.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {readiness.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                  >
                    <h3 className="font-display text-xl text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {partnershipLanes.map((item) => {
              const Icon = item.icon

              return (
                <article key={item.title} className="glass-card rounded-[1.6rem] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                        <Icon className={`h-6 w-6 ${item.tone}`} />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl text-white">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 text-slate-500" />
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
