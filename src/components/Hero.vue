<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps({
  countdown: {
    type: Object,
    required: true,
    default: () => ({ Hari: 0, Jam: 0, Menit: 0, Detik: 0 })
  }
})

// === 1. LOGIC 3D TILT (MOUSE & GYROSCOPE) ===
const cardRotateX = ref(0)
const cardRotateY = ref(0)
const cardBgX = ref(0)
const cardBgY = ref(0)

// Config Sensitivitas
const sensitivity = {
  mouse: 20, // Derajat kemiringan mouse
  gyro: 30   // Derajat kemiringan HP
}

// Handler Mouse (Desktop)
const handleMouseMove = (e) => {
  const x = (e.clientX / window.innerWidth) - 0.5
  const y = (e.clientY / window.innerHeight) - 0.5
  
  // Update nilai ref untuk dipakai di template style
  // Menggunakan GSAP quickSetter/to di dalam watch/loop lebih performant, 
  // tapi untuk Vue reactivity ini cukup smooth.
  gsap.to(cardRotateY, { value: x * sensitivity.mouse, duration: 0.5 })
  gsap.to(cardRotateX, { value: -y * sensitivity.mouse, duration: 0.5 })
  gsap.to(cardBgX, { value: -x * 40, duration: 1 }) // Parallax Background layer
  gsap.to(cardBgY, { value: -y * 40, duration: 1 })
}

// Handler Gyroscope (Mobile)
const handleGyro = (e) => {
  // Batasi sudut agar tidak berputar 360
  const x = Math.min(Math.max(e.gamma, -45), 45) / 45 // Kiri-Kanan (-1 to 1)
  const y = Math.min(Math.max(e.beta, -45), 45) / 45  // Atas-Bawah (-1 to 1)

  gsap.to(cardRotateY, { value: x * sensitivity.gyro, duration: 1 })
  gsap.to(cardRotateX, { value: -y * sensitivity.gyro, duration: 1 })
  gsap.to(cardBgX, { value: -x * 50, duration: 1.5 })
  gsap.to(cardBgY, { value: -y * 50, duration: 1.5 })
}

// === 2. CANVAS GOLD DUST (PARTIKEL) ===
const canvasRef = ref(null)
let animationId
let particles = []

class Particle {
  constructor(w, h) {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.size = Math.random() * 2 + 0.5 // Ukuran bervariasi
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 - 0.25
    this.opacity = Math.random() * 0.5 + 0.1
  }
  update(w, h) {
    this.x += this.speedX
    this.y += this.speedY
    // Wrap around screen
    if (this.x > w) this.x = 0; if (this.x < 0) this.x = w;
    if (this.y > h) this.y = 0; if (this.y < 0) this.y = h;
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})` // Gold color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w = canvas.width = window.innerWidth
  let h = canvas.height = window.innerHeight

  // Buat 100 partikel
  particles = Array.from({ length: 80 }, () => new Particle(w, h))

  const animate = () => {
    ctx.clearRect(0, 0, w, h)
    particles.forEach(p => {
      p.update(w, h)
      p.draw(ctx)
    })
    animationId = requestAnimationFrame(animate)
  }
  animate()

  // Resize handler
  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  })
}

// === SCROLL SCROLL ===
const scrollToNext = () => {
  const nextSection = document.querySelector('section:nth-of-type(2)')
  if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  // Event Listeners
  window.addEventListener('mousemove', handleMouseMove)
  // Cek support Gyroscope (Hanya jalan di HTTPS atau Localhost)
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleGyro)
  }

  // Init Canvas
  initCanvas()

  // Animasi Masuk (Text Reveal)
  const tl = gsap.timeline({ delay: 0.2 })
  
  tl.from('.hero-subtitle', { opacity: 0, y: -20, duration: 1.5, ease: 'power2.out' })
    .from('.hero-word', { 
      y: 100, 
      opacity: 0, 
      rotationX: -90, 
      stagger: 0.1, 
      duration: 1.2, 
      ease: 'back.out(1.5)' 
    }, '-=1')
    .from('.hero-quote-group', { opacity: 0, y: 30, duration: 1 }, '-=0.5')
    .from('.hero-countdown', { opacity: 0, y: 50, duration: 1, ease: 'back.out(1.7)' }, '-=0.8')
    .from('.hero-scroll-btn', { opacity: 0, y: -10, duration: 1, repeat: -1, yoyo: true }, '-=0.5')
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('deviceorientation', handleGyro)
  cancelAnimationFrame(animationId)
})
</script>

<template>
  <section id="hero" class="relative h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center text-center px-6 bg-charcoal perspective-container">
    
    <div 
      class="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] z-0 pointer-events-none will-change-transform"
      :style="{ transform: `translate(${cardBgX}px, ${cardBgY}px)` }"
    >
      <img 
        src="/images/hero-city.jpg" 
        class="w-full h-full object-cover opacity-90"
        alt="Wedding Hero Background"
        loading="eager" 
        fetchpriority="high"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/20 to-charcoal/95"></div>
    </div>

    <canvas ref="canvasRef" class="absolute inset-0 z-1 pointer-events-none w-full h-full"></canvas>

    <div 
      class="relative z-10 w-full max-w-4xl mx-auto mt-[-5vh] will-change-transform"
      :style="{ transform: `rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg)` }"
    >
      
      <p class="hero-subtitle font-serif text-white/90 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-8 drop-shadow-md">
        The Wedding Celebration Of
      </p>

      <div class="hero-title-group relative mb-14 preserve-3d">
        <h1 class="absolute inset-0 font-script text-6xl md:text-8xl lg:text-9xl text-black/50 blur-md flex flex-col items-center gap-2 select-none pointer-events-none transform translate-y-8 translate-z-[-20px]">
          <span>Romeo</span><span>&</span><span>Juliet</span>
        </h1>

        <h1 class="font-script text-6xl md:text-8xl lg:text-9xl leading-none flex flex-col items-center gap-2 relative z-10 drop-shadow-2xl">
          <div class="overflow-hidden p-2"><span class="hero-word inline-block gradient-gold-text" data-text="Romeo">Romeo</span></div>
          <div class="overflow-hidden p-1"><span class="hero-word inline-block font-serif text-3xl md:text-5xl text-white/80 italic my-1">&</span></div>
          <div class="overflow-hidden p-2"><span class="hero-word inline-block gradient-gold-text" data-text="Juliet">Juliet</span></div>
        </h1>
      </div>

      <div class="hero-quote-group mb-12 space-y-6 transform translate-z-[10px]">
        <p class="font-serif text-white/95 text-sm md:text-lg italic tracking-wide drop-shadow-md">
          "Together is a beautiful place to be"
        </p>
        <div class="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-luxury to-transparent mx-auto opacity-80"></div>
        <p class="font-serif text-gold-luxury tracking-[0.2em] uppercase text-xs md:text-sm font-semibold drop-shadow-sm">
          Sabtu, 14 Februari 2026
        </p>
      </div>

      <div class="hero-countdown grid grid-cols-4 gap-3 md:gap-8 max-w-lg mx-auto py-5 px-4 md:px-8 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl hover:bg-white/[0.05] transition-colors duration-300 transform translate-z-[20px]">
        <div class="flex flex-col items-center"><span class="text-xl md:text-3xl font-serif text-white font-medium">{{ countdown.Hari }}</span><span class="text-[8px] md:text-[9px] text-gold-luxury/80 uppercase tracking-widest mt-1">Hari</span></div>
        <div class="flex flex-col items-center relative">
            <div class="absolute -left-1.5 md:-left-4 top-1/2 -translate-y-1/2 w-px h-6 bg-white/10"></div>
            <span class="text-xl md:text-3xl font-serif text-white font-medium">{{ countdown.Jam }}</span><span class="text-[8px] md:text-[9px] text-gold-luxury/80 uppercase tracking-widest mt-1">Jam</span></div>
        <div class="flex flex-col items-center relative">
            <div class="absolute -left-1.5 md:-left-4 top-1/2 -translate-y-1/2 w-px h-6 bg-white/10"></div>
            <span class="text-xl md:text-3xl font-serif text-white font-medium">{{ countdown.Menit }}</span><span class="text-[8px] md:text-[9px] text-gold-luxury/80 uppercase tracking-widest mt-1">Menit</span></div>
        <div class="flex flex-col items-center relative">
            <div class="absolute -left-1.5 md:-left-4 top-1/2 -translate-y-1/2 w-px h-6 bg-white/10"></div>
            <span class="text-xl md:text-3xl font-serif text-gold-luxury font-medium w-8 text-center">{{ countdown.Detik }}</span><span class="text-[8px] md:text-[9px] text-gold-luxury/80 uppercase tracking-widest mt-1">Detik</span></div>
      </div>

    </div>

    <button @click="scrollToNext" class="hero-scroll-btn absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2 z-20 hover:text-white transition-colors cursor-pointer outline-none group">
      <span class="text-[8px] uppercase tracking-widest group-hover:text-gold-luxury transition-colors">Scroll</span>
      <svg class="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
    </button>

  </section>
</template>

<style scoped>
.perspective-container {
  perspective: 1200px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

/* Helper Class untuk Depth 3D manual di Tailwind */
.translate-z-\[-20px\] { transform: translateZ(-20px); }
.translate-z-\[10px\] { transform: translateZ(10px); }
.translate-z-\[20px\] { transform: translateZ(20px); }

.gradient-gold-text {
  background: linear-gradient(to bottom, #cfc09f 0%, #ffecb3 20%, #a88d45 40%, #ffecb3 70%, #9c8438 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  filter: drop-shadow(0px 2px 0px rgba(168, 141, 69, 0.5));
  position: relative;
}

.gradient-gold-text::after {
  content: attr(data-text);
  position: absolute;
  left: 0; top: 0; width: 100%; height: 100%;
  background: linear-gradient(120deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.8) 50%, transparent 60%, transparent 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  animation: shine 5s infinite ease-in-out;
  pointer-events: none;
}

@keyframes shine {
  0%, 80% { opacity: 0; background-position: -200%; }
  90% { opacity: 1; }
  100% { opacity: 0; background-position: 200%; }
}
</style>

