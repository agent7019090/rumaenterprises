"use client"

import AdvancedParticles from "./advanced-particles"
import AnimatedGradientBackground from "./animated-gradient-background"
import ThreeDScene from "./3d-scene"

export function PremiumBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #050816 0%, #040c1f 42%, #030918 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(100% 70% at 50% 26%, rgba(20, 41, 90, 0.26), transparent 66%),
            radial-gradient(58% 36% at 14% 30%, rgba(56,189,248,0.09), transparent 74%),
            radial-gradient(48% 30% at 86% 20%, rgba(139,92,246,0.1), transparent 72%),
            radial-gradient(48% 34% at 84% 62%, rgba(16,185,129,0.08), transparent 74%)
          `,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              rgba(56, 189, 248, 0.026) 0,
              rgba(56, 189, 248, 0.026) 1px,
              transparent 1px,
              transparent 42px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(139, 92, 246, 0.026) 0,
              rgba(139, 92, 246, 0.026) 1px,
              transparent 1px,
              transparent 42px
            )
          `,
        }}
      />

      <div className="absolute inset-0 opacity-70 mix-blend-screen">
        <AnimatedGradientBackground />
      </div>

      <div className="absolute inset-0 opacity-95">
        <AdvancedParticles />
      </div>

      <div className="absolute inset-0 opacity-55">
        <ThreeDScene />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 95% at 50% 34%, transparent 40%, rgba(2, 6, 23, 0.26) 68%, rgba(2, 6, 23, 0.64) 100%)",
        }}
      />
    </div>
  )
}
