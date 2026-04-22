"use client"

import { useEffect, useRef } from "react"

export default function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let t = 0
    let frame = 0

    const drawGlow = (x: number, y: number, color: string, size: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)

      gradient.addColorStop(0, color)
      gradient.addColorStop(1, "transparent")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      t += 0.002

      // BLUE GLOW
      drawGlow(
        canvas.width * (0.5 + Math.sin(t * 0.7) * 0.2),
        canvas.height * (0.4 + Math.cos(t * 0.6) * 0.2),
        "rgba(56, 189, 248, 0.12)",
        canvas.width * 0.6
      )

      // VIOLET GLOW
      drawGlow(
        canvas.width * (0.7 + Math.cos(t * 0.5) * 0.2),
        canvas.height * (0.3 + Math.sin(t * 0.8) * 0.2),
        "rgba(139, 92, 246, 0.10)",
        canvas.width * 0.5
      )

      // GREEN GLOW
      drawGlow(
        canvas.width * (0.3 + Math.sin(t * 0.6) * 0.2),
        canvas.height * (0.7 + Math.cos(t * 0.7) * 0.2),
        "rgba(16, 185, 129, 0.08)",
        canvas.width * 0.5
      )

      // subtle noise dots (reduced, cleaner)
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height

        ctx.fillStyle = "rgba(255,255,255,0.03)"
        ctx.fillRect(x, y, 1, 1)
      }

      frame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{
        filter: "blur(40px)", // THIS is important
        opacity: 0.8,
      }}
    />
  )
}