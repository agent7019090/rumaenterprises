"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [supportsHover, setSupportsHover] = useState(false)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const onMouseEnter = () => setHidden(false)
    const onMouseLeave = () => setHidden(true)
    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    const handleLinkHoverEvents = () => {
      document
        .querySelectorAll("a, button, [role=button], input, textarea, select, details, [tabindex]:not([tabindex='-1'])")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => setLinkHovered(true))
          el.addEventListener("mouseleave", () => setLinkHovered(false))
        })
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    handleLinkHoverEvents()

    const mediaQuery = window.matchMedia("(hover: hover)")
    setSupportsHover(mediaQuery.matches)

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setSupportsHover(event.matches)
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      mediaQuery.removeEventListener("change", handleMediaQueryChange)
    }
  }, [])

  if (!supportsHover) return null

  return (
    <>
      <div
        className={`custom-cursor-dot ${hidden ? "opacity-0" : "opacity-100"} ${clicked ? "scale-50" : ""}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`custom-cursor-outline ${hidden ? "opacity-0" : "opacity-100"} ${
          clicked ? "scale-[0.72]" : "scale-100"
        } ${linkHovered ? "bg-primary/5 border-white/65 shadow-[0_0_34px_rgba(255,255,255,0.18)]" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transitionDuration: linkHovered ? "0.2s" : "0.1s",
        }}
      />
    </>
  )
}
