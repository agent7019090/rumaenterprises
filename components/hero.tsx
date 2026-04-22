import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import MagneticButton from '@/components/magnetic-button'

const heroPills = ['Bulk sourcing', 'Amazon & Flipkart ops', 'End-to-end fulfillment']

export function Hero() {
  return (
    <section className="section-shell scroll-mt-28 pb-20 pt-10 sm:pb-24 sm:pt-14 lg:pb-28 lg:pt-16">
      <div className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        
        {/* Ambient background */}
        <div className="ambient-orb left-1/2 top-20 h-56 w-56 -translate-x-1/2 bg-violet-500/[0.14]" />
        <div
          className="ambient-orb bottom-10 right-14 h-44 w-44 bg-emerald-400/[0.1]"
          style={{ animationDelay: '1.8s' }}
        />
        <div
          className="ambient-orb left-10 top-1/2 h-40 w-40 bg-sky-400/[0.1]"
          style={{ animationDelay: '0.8s' }}
        />

        <div className="pointer-events-none absolute left-1/2 top-[64%] h-28 w-72 -translate-x-1/2 rounded-full bg-emerald-400/[0.05] blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-[58%] h-24 w-80 -translate-x-1/2 rounded-full bg-sky-400/[0.04] blur-3xl" />

        {/* Content */}
        <div className="relative mx-auto max-w-4xl text-left">

          {/* Badge */}
          <div className="section-badge">
            <span>
              <Sparkles size={12} className="text-fuchsia-300" />
              Smart Distribution Solutions
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display mt-8 text-5xl leading-[0.95] tracking-[-0.02em] text-white sm:text-6xl lg:text-8xl">
            Scale Your Brand Without
            <br />
            Distribution{' '}
            <span className="gradient-text-violet">
              Chaos
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-7 max-w-2xl text-lg leading-7 text-white/80 sm:text-xl">
            We handle sourcing, marketplaces, and logistics, so you can focus on building demand.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <MagneticButton asChild strength={15} className="button-primary min-w-[220px]">
              <Link href="#contact">
                Request Partnership
                <ArrowRight size={18} />
              </Link>
            </MagneticButton>

            <MagneticButton asChild strength={15} variant="outline" className="button-secondary min-w-[220px]">
              <Link href="#services">
                Explore Services
                <ArrowRight size={18} />
              </Link>
            </MagneticButton>
          </div>

          {/* Pills */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {heroPills.map((item) => (
              <div key={item} className="metric-chip">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}