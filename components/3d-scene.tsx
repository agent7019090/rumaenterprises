"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const COLORS = [0x38bdf8, 0x8b5cf6, 0x10b981]

export default function ThreeDScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()

    const ambientLight = new THREE.AmbientLight(0x88aaff, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x38bdf8, 1.5, 20)
    pointLight.position.set(2, 3, 4)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 1.2, 20)
    pointLight2.position.set(-3, -2, 3)
    scene.add(pointLight2)

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    containerRef.current.appendChild(renderer.domElement)

    // ------------------------
    // ✨ NODES
    // ------------------------

    const nodeCount = 90
    const nodes: THREE.Mesh[] = []
    const velocities: THREE.Vector3[] = []

    for (let i = 0; i < nodeCount; i++) {
      const color =
        Math.random() < 0.15
          ? COLORS[Math.floor(Math.random() * COLORS.length)]
          : 0x9fdcff

      const depth = Math.random()    

      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.008 + depth * 0.02, 6, 6),
        new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.4 + depth * 0.6,
        blending: THREE.AdditiveBlending,
        })
      )
        

      node.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      )

      const angle = Math.random() * Math.PI * 2
      const speed = 0.004 + Math.random() * 0.006

      velocities.push(
        new THREE.Vector3(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          0
        )
      )

      nodes.push(node)
      scene.add(node)
    }

    // ------------------------
    // 🔗 LINES
    // ------------------------

    const lines: THREE.Line[] = []

    const createConnections = () => {
      lines.forEach((l) => scene.remove(l))
      lines.length = 0

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position)

          if (dist < 0.8 && dist > 0.35) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              nodes[i].position,
              nodes[j].position,
            ])

            const color =
              Math.random() < 0.35
                ? COLORS[Math.floor(Math.random() * COLORS.length)]
                : 0x6ea8ff

            const material = new THREE.LineBasicMaterial({
              color,
              transparent: true,
              opacity: 0.05 + (1 - dist / 0.8) * 0.25,
              blending: THREE.AdditiveBlending,
            })

            const line = new THREE.Line(geometry, material)
            lines.push(line)
            scene.add(line)
          }
        }
      }
    }

    createConnections()

    // ------------------------
    // 🔷 FLOATING SHAPES (IMPORTANT)
    // ------------------------

    const shapes: THREE.Mesh[] = []

    const createShape = (geometry: THREE.BufferGeometry, position: THREE.Vector3) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]

      const material = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.copy(position)

      scene.add(mesh)
      shapes.push(mesh)
    }

    // only 2–3 shapes → clean look
    createShape(new THREE.IcosahedronGeometry(0.7, 0), new THREE.Vector3(-2, 1, -1))
    createShape(new THREE.TetrahedronGeometry(0.6, 0), new THREE.Vector3(2, -1, -1))
    createShape(new THREE.OctahedronGeometry(0.8, 0), new THREE.Vector3(0, 2, -2))

    // ------------------------
    // 🎬 ANIMATION
    // ------------------------

    let frameCount = 0
    let rafId = 0

    const animate = () => {
      frameCount++
      // move nodes (REAL motion)
      nodes.forEach((node, i) => {
        node.position.add(velocities[i])

        // 🔥 anti-cluster force (goes HERE)
        const centerForce = -0.0005
        node.position.x += node.position.x * centerForce
        node.position.y += node.position.y * centerForce
        
        // bounce
        if (Math.abs(node.position.x) > 7) velocities[i].x *= -1
        if (Math.abs(node.position.y) > 4) velocities[i].y *= -1
      })

      // update connections (this makes lines feel alive)
      if (frameCount % 6 === 0) createConnections()

      // rotate shapes slowly
      shapes.forEach((shape, i) => {
        shape.rotation.x += 0.002 + i * 0.001
        shape.rotation.y += 0.003 - i * 0.001
      })

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }

    animate()

    // ------------------------
    // 📐 RESIZE
    // ------------------------

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(rafId)

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
}