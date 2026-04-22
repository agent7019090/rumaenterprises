import type { CSSProperties } from 'react'
import { Boxes, LayoutGrid, Package, Store, Truck } from 'lucide-react'

const services = [
  {
    icon: Package,
    title: 'Wholesale Procurement',
    description: 'Source inventory with better pricing, cleaner margins, and reliable supply.',
    iconClass: 'text-emerald-400',
    glowClass: 'bg-emerald-400/[0.18]',
    barClass: 'from-emerald-400/80 to-emerald-400/0',
    borderGradient: 'linear-gradient(140deg, rgba(16,185,129,0.8), rgba(96,165,250,0.45), rgba(255,255,255,0.04))',
    glowTone: 'rgba(16,185,129,0.3)',
  },
  {
    icon: Store,
    title: 'Amazon Marketplace Selling',
    description: 'Launch and grow on Amazon & Flipkart with structured execution.',
    iconClass: 'text-sky-400',
    glowClass: 'bg-sky-400/[0.18]',
    barClass: 'from-sky-400/80 to-sky-400/0',
    borderGradient: 'linear-gradient(140deg, rgba(96,165,250,0.82), rgba(139,92,246,0.48), rgba(255,255,255,0.04))',
    glowTone: 'rgba(96,165,250,0.26)',
  },
  {
    icon: Boxes,
    title: 'Brand Distribution',
    description: 'Expand into wholesale and retail with clear channel strategy.',
    iconClass: 'text-fuchsia-400',
    glowClass: 'bg-fuchsia-400/[0.18]',
    barClass: 'from-fuchsia-400/80 to-fuchsia-400/0',
    borderGradient: 'linear-gradient(140deg, rgba(236,72,153,0.78), rgba(139,92,246,0.5), rgba(255,255,255,0.04))',
    glowTone: 'rgba(236,72,153,0.28)',
  },
  {
    icon: LayoutGrid,
    title: 'Inventory Management',
    description: 'Track inventory clearly and reduce stock-related friction.',
    iconClass: 'text-violet-400',
    glowClass: 'bg-violet-400/[0.18]',
    barClass: 'from-violet-400/80 to-violet-400/0',
    borderGradient: 'linear-gradient(140deg, rgba(139,92,246,0.78), rgba(96,165,250,0.42), rgba(255,255,255,0.04))',
    glowTone: 'rgba(139,92,246,0.28)',
  },
  {
    icon: Truck,
    title: 'Logistics & Fulfillment',
    description: 'Handle fulfillment, warehousing, and delivery without chaos.',
    iconClass: 'text-cyan-400',
    glowClass: 'bg-cyan-400/[0.18]',
    barClass: 'from-cyan-400/80 to-cyan-400/0',
    borderGradient: 'linear-gradient(140deg, rgba(34,211,238,0.8), rgba(16,185,129,0.42), rgba(255,255,255,0.04))',
    glowTone: 'rgba(34,211,238,0.26)',
  },
]

export function Services() {
  return (
    <section id="services" className="scroll-mt-28 py-16 sm:py-20">
      <div className="section-shell">
        <div className="ambient-orb left-6 top-16 h-44 w-44 bg-violet-500/[0.12]" />
        <div className="ambient-orb bottom-0 right-12 h-48 w-48 bg-sky-400/[0.1]" style={{ animationDelay: '1.4s' }} />

        <div className="mx-auto max-w-3xl text-center">
          <div className="section-badge">
            <span>Our Solutions</span>
          </div>
          <h2 className="font-display mt-6 text-4xl text-white sm:text-5xl lg:text-6xl">
            Where we <span className="gradient-text">take over</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Everything you need to scale, without operational noise.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {services.map((service) => {
            const Icon = service.icon
            const cardStyle = {
              '--card-gradient': service.borderGradient,
              '--card-glow': service.glowTone,
            } as CSSProperties

            return (
              <article
                key={service.title}
                className="service-card glass-card group relative overflow-hidden rounded-[1.6rem] p-6"
                style={cardStyle}
              >
                <div className={`absolute -right-10 top-0 h-28 w-28 rounded-full blur-3xl ${service.glowClass} opacity-70`} />
                <div
                  className={`absolute inset-x-6 bottom-0 h-px bg-gradient-to-r ${service.barClass} opacity-70 transition group-hover:opacity-100`}
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition group-hover:bg-white/[0.05]">
                      <Icon className={`h-6 w-6 ${service.iconClass}`} />
                    </div>
                    <span className="text-[0.65rem] uppercase tracking-[0.34em] text-slate-500">{service.accent}</span>
                  </div>

                  <h3 className="mt-8 font-display text-2xl text-white">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{service.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
