"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  baseColor: string
  isAccent: boolean
  opacity: number
  life: number
  maxLife: number
  connections: number[]
}

const ACCENT_COLORS = ["56, 189, 248", "139, 92, 246", "16, 185, 129"]
const CONNECTION_COLOR = "88, 119, 255"

export default function AdvancedParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100)

      for (let i = 0; i < particleCount; i += 1) {
        particlesRef.current.push(createParticle())
      }
    }

    const createParticle = (x?: number, y?: number): Particle => {
      const size = Math.random() * 2 + 0.5
      const maxLife = Math.random() * 100 + 100
      const isAccent = Math.random() < 0.12
      const accentColor = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]

      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        size,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        baseColor: isAccent ? accentColor : "255, 255, 255",
        isAccent,
        opacity: Math.random() * 0.5 + 0.3,
        life: 0,
        maxLife,
        connections: [],
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        particle.life += 1
        if (particle.life > particle.maxLife) return false

        const lifeRatio = 1 - particle.life / particle.maxLife
        const fadeInOut =
          lifeRatio < 0.2
            ? lifeRatio * 5
            : lifeRatio > 0.8
            ? (1 - lifeRatio) * 5
            : 1

        const particleAlpha = particle.opacity * fadeInOut

        // 🔥 DRAW PARTICLE
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particle.baseColor}, ${particleAlpha})`

        if (particle.isAccent) {
          ctx.shadowColor = `rgba(${particle.baseColor}, 0.6)`
          ctx.shadowBlur = 12
        } else {
          ctx.shadowBlur = 0
        }

        ctx.fill()

        // 🔗 CONNECTIONS
        particle.connections = []
        for (let i = index + 1; i < particlesRef.current.length; i += 1) {
          const otherParticle = particlesRef.current[i]
          const distance = Math.hypot(
            particle.x - otherParticle.x,
            particle.y - otherParticle.y
          )

          if (distance < 120) {
            particle.connections.push(i)

            const alpha = 0.25 * (1 - distance / 120) * fadeInOut

            // 🎨 dynamic color logic
            let lineColor = "133, 154, 255"

            if (particle.isAccent && otherParticle.isAccent) {
              lineColor = particle.baseColor
            } else if (particle.isAccent) {
              lineColor = particle.baseColor
            } else if (otherParticle.isAccent) {
              lineColor = otherParticle.baseColor
            }

            ctx.beginPath()
            ctx.strokeStyle = `rgba(${CONNECTION_COLOR}, ${alpha})`
            ctx.lineWidth = 0.6

            // glow for colored lines
            if (lineColor !== "133, 154, 255") {
              ctx.shadowColor = `rgba(${lineColor}, 0.5)`
              ctx.shadowBlur = 6
            } else {
              ctx.shadowBlur = 0
            }

            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()

            ctx.shadowBlur = 0 // reset
          }
        }

        particle.speedX *= 0.99
        particle.speedY *= 0.99

        return true
      })

      while (particlesRef.current.length < 100) {
        particlesRef.current.push(createParticle())
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.85 }}
    />
  )
}