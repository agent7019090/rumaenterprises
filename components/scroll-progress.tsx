"use client"

import { useEffect, useRef } from "react"

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrollPosition = window.scrollY
        const progress = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0

        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={progressRef}
      className="fixed top-0 left-0 z-[9999] h-1 bg-gradient-to-r from-slate-400 via-white to-slate-600 transition-[width] duration-75 ease-out"
      aria-hidden="true"
    />
  )
}
