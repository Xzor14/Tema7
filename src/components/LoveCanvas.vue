<template>
  <canvas ref="canvasRef" class="fixed inset-0 z-0 w-full h-full pointer-events-none"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)
let ctx = null
let animationFrameId = null
let particles = []

// Logic Responsif: HP = 20 partikel, Laptop = 60 partikel
const getParticleCount = () => window.innerWidth < 768 ? 20 : 60

class Particle {
  constructor(w, h) {
    this.reset(w, h)
  }
  
  reset(w, h) {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.size = Math.random() * (window.innerWidth < 768 ? 8 : 15) + 2 // Ukuran menyesuaikan layar
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 - 0.25
    this.opacity = Math.random() * 0.5 + 0.1
    this.isHeart = Math.random() > 0.6
  }

  update(w, h) {
    this.x += this.speedX
    this.y += this.speedY
    if (this.x < -20 || this.x > w + 20 || this.y < -20 || this.y > h + 20) {
      this.reset(w, h)
    }
  }

  draw() {
    ctx.fillStyle = `rgba(244, 63, 94, ${this.opacity})` // Tailwind Rose-500
    ctx.beginPath()
    if (this.isHeart) {
      const s = this.size
      ctx.moveTo(this.x, this.y)
      ctx.bezierCurveTo(this.x - s/2, this.y - s/2, this.x - s, this.y + s/3, this.x, this.y + s)
      ctx.bezierCurveTo(this.x + s, this.y + s/3, this.x + s/2, this.y - s/2, this.x, this.y)
    } else {
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2)
    }
    ctx.fill()
  }
}

const init = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')
  
  particles = []
  const count = getParticleCount()
  for (let i = 0; i < count; i++) particles.push(new Particle(canvas.width, canvas.height))
}

const animate = () => {
  if (!ctx) return
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  particles.forEach(p => {
    p.update(canvasRef.value.width, canvasRef.value.height)
    p.draw()
  })
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  init()
  animate()
  // Debounce resize event untuk performa
  let timeout
  window.addEventListener('resize', () => {
    clearTimeout(timeout)
    timeout = setTimeout(init, 200)
  })
})

onBeforeUnmount(() => cancelAnimationFrame(animationFrameId))
</script>

