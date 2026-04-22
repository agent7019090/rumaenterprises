'use client'

import { useState } from 'react'
import { Clock3, Mail, Radar, Send } from 'lucide-react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Form submitted:', formData)
      setSubmitStatus('success')
      setFormData({ name: '', company: '', email: '', message: '' })
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-28 py-16 sm:py-20">
      <div className="section-shell">
        <div className="ambient-orb left-1/3 top-12 h-40 w-40 bg-sky-400/[0.06]" />
        <div className="ambient-orb right-12 bottom-0 h-48 w-48 bg-emerald-400/[0.07]" style={{ animationDelay: '1.4s' }} />
        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
            <div className="ambient-orb left-0 top-1/3 h-40 w-40 bg-fuchsia-500/[0.14]" />

            <div className="relative">
              <div className="section-badge">
                <span>Contact</span>
              </div>
              <h2 className="font-display mt-6 text-4xl text-white sm:text-5xl">
                Let’s talk about your next <span className="gradient-text">move</span>
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Tell us what you're building, we'll help you figure out the right way to scale it.
              </p>

              <div className="mt-10 space-y-4">
                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-start gap-4">
                    <Mail className="mt-1 h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Email</p>
                      <a href="mailto:info@rumaenterprises.com" className="mt-2 block text-lg text-white">
                        info@rumaenterprises.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-start gap-4">
                    <Radar className="mt-1 h-5 w-5 text-sky-400" />
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Focus</p>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        Wholesale sourcing, marketplace operations, and premium distribution support.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-start gap-4">
                    <Clock3 className="mt-1 h-5 w-5 text-violet-400" />
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Response Window</p>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        Most partnership inquiries are reviewed within 1 to 2 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-200">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="field-input"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-slate-200">
                  Company Name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Your Company"
                  className="field-input"
                />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-200">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="field-input"
              />
            </div>

            <div className="mt-5 space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-slate-200">
                Tell us about your goals
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Share your product category, channels, and what kind of distribution support you need."
                className="field-input min-h-40 resize-none"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="mt-5 rounded-[1.2rem] border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                Success: we&apos;ll be in touch soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-5 rounded-[1.2rem] border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="button-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
