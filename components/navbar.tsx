'use client'

import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import MagneticButton from '@/components/magnetic-button'

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Operating Model', href: '#how-we-work' },
  { label: 'Partnerships', href: '#brands' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      <div className="section-shell pt-4">
        <nav className="glass-panel rounded-full px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
                <div className="absolute inset-[6px] rounded-full border border-emerald-400/25" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.85)]" />
              </div>
              <div className="min-w-0">
                <p className="font-display truncate text-lg font-semibold text-white">
                  Ruma <span className="text-emerald-400">Enterprises</span>
                </p>
                <p className="truncate text-[0.62rem] uppercase tracking-[0.34em] text-slate-400/80">
                  Smart Distribution Systems
                </p>
              </div>
            </Link>

            <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <MagneticButton asChild strength={12} className="button-primary px-5 py-3 text-sm">
                <Link href="#contact">
                  Partner With Us
                  <ArrowRight size={16} />
                </Link>
              </MagneticButton>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-200 transition hover:border-violet-400/30 hover:text-white md:hidden"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {isOpen && (
            <div className="mt-4 md:hidden">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 shadow-[0_24px_50px_rgba(2,6,23,0.36)] backdrop-blur-xl">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <MagneticButton asChild strength={12} className="button-primary mt-2 w-full justify-center">
                    <Link href="#contact" onClick={() => setIsOpen(false)}>
                      Partner With Us
                      <ArrowRight size={16} />
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
