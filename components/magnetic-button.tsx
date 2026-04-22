"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MagneticButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  strength?: number
  children: React.ReactNode
}

export default function MagneticButton({ strength = 20, children, className, ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    setPosition({ x, y })
  }

  const strengthFactor = strength / 20

  return (
    <Button
      ref={buttonRef}
      className={cn("transition-transform duration-100", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setPosition({ x: 0, y: 0 })
      }}
      style={{
        transform: isHovered
          ? `translate(${position.x * 0.1 * strengthFactor}px, ${position.y * 0.1 * strengthFactor}px)`
          : "translate(0, 0)",
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
