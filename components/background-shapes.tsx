"use client"

import { useEffect, useRef } from "react"

type Shape = {
  x: number
  y: number
  size: number
  angle: number
  speed: number
  driftX: number
  driftY: number
  points: number
  color: string
}

export default function BackgroundShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const buildShapes = () => {
      const w = canvas.width
      const h = canvas.height

      return [
        { x: w * 0.15, y: h * 0.33, size: 68, angle: 0.3, speed: 0.00032, driftX: 0.05, driftY: 0.03, points: 7, color: "56,189,248" },
        { x: w * 0.9, y: h * 0.19, size: 54, angle: 1.1, speed: -0.00028, driftX: -0.04, driftY: 0.02, points: 6, color: "139,92,246" },
        { x: w * 0.86, y: h * 0.71, size: 62, angle: 0.8, speed: 0.00024, driftX: 0.03, driftY: -0.04, points: 6, color: "16,185,129" },
      ] satisfies Shape[]
    }

    let shapes: Shape[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      shapes = buildShapes()
    }

    const drawMesh = (shape: Shape, time: number) => {
      const vertices = Array.from({ length: shape.points }, (_, i) => {
        const angle = shape.angle + (Math.PI * 2 * i) / shape.points
        return {
          x: shape.x + Math.cos(angle) * shape.size,
          y: shape.y + Math.sin(angle) * shape.size,
        }
      })

      ctx.strokeStyle = `rgba(${shape.color}, 0.58)`
      ctx.lineWidth = 1
      ctx.shadowColor = `rgba(${shape.color}, 0.42)`
      ctx.shadowBlur = 8

      ctx.beginPath()
      ctx.moveTo(vertices[0].x, vertices[0].y)
      for (let i = 1; i < vertices.length; i += 1) {
        ctx.lineTo(vertices[i].x, vertices[i].y)
      }
      ctx.closePath()
      ctx.stroke()

      for (let a = 0; a < vertices.length; a += 1) {
        for (let b = a + 1; b < vertices.length; b += 1) {
          const dist = Math.hypot(vertices[a].x - vertices[b].x, vertices[a].y - vertices[b].y)
          const alpha = Math.max(0.08, 0.28 - dist / (shape.size * 6))
          ctx.strokeStyle = `rgba(${shape.color}, ${alpha})`
          ctx.lineWidth = 0.7
          ctx.beginPath()
          ctx.moveTo(vertices[a].x, vertices[a].y)
          ctx.lineTo(vertices[b].x, vertices[b].y)
          ctx.stroke()
        }
      }

      for (const v of vertices) {
        const pulse = 0.76 + Math.sin(time * 0.0016 + v.x * 0.01 + v.y * 0.01) * 0.24
        ctx.fillStyle = `rgba(${shape.color}, ${0.78 * pulse})`
        ctx.shadowColor = `rgba(${shape.color}, 0.45)`
        ctx.shadowBlur = 7
        ctx.beginPath()
        ctx.arc(v.x, v.y, 2.3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const shape of shapes) {
        if (!reducedMotion) {
          shape.angle += shape.speed
          shape.x += shape.driftX
          shape.y += shape.driftY
        }

        if (shape.x < -120) shape.x = canvas.width + 120
        if (shape.x > canvas.width + 120) shape.x = -120
        if (shape.y < -120) shape.y = canvas.height + 120
        if (shape.y > canvas.height + 120) shape.y = -120

        drawMesh(shape, time)
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resize)
    resize()

    if (reducedMotion) {
      animate(0)
      cancelAnimationFrame(frameRef.current)
    } else {
      frameRef.current = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ opacity: 0.85 }} />
}
