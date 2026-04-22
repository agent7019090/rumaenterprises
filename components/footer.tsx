import Link from 'next/link'

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Operating Model', href: '#how-we-work' },
  { label: 'Partnerships', href: '#brands' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="pb-8 pt-6">
      <div className="section-shell">
        <div className="glass-panel rounded-[1.75rem] px-6 py-8 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="font-display text-2xl text-white">
                Ruma <span className="text-emerald-400">Enterprises</span>
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Premium distribution support for brands that want smarter sourcing, calmer operations, and stronger
                channel execution.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-400">
              {footerLinks.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="soft-divider my-6" />

          <div className="flex flex-col gap-3 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <p>&copy; {currentYear} Ruma Enterprises. All rights reserved.</p>
            <a href="mailto:info@rumaenterprises.com" className="transition hover:text-white">
              info@rumaenterprises.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
