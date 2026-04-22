import { About } from '@/components/about'
import { Brands } from '@/components/brands'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { HowWeWork } from '@/components/how-we-work'
import { Navbar } from '@/components/navbar'
import { Services } from '@/components/services'

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Services />
      <HowWeWork />
      <Brands />
      <About />
      <ContactForm />
      <Footer />
    </main>
  )
}
