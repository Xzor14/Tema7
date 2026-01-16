<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// --- 1. IMPORT SEMUA KOMPONEN ---
import Opening from './components/Opening.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import SectionDivider from './components/SectionDivider.vue'
import Couple from './components/Couple.vue'
import Event from './components/Event.vue'
import Gallery from './components/Gallery.vue'
import Rsvp from './components/Rsvp.vue'
import Gift from './components/Gift.vue' 
import Footer from './components/Footer.vue' 

gsap.registerPlugin(ScrollTrigger)

// --- STATE VARIABLES ---
const isOpened = ref(false)
const isPlaying = ref(false)
const audioRef = ref(null)

// Countdown Target (Ganti tanggal di sini)
const targetDate = new Date('2026-02-14T08:00:00').getTime() 
const countdown = reactive({ Hari: 0, Jam: 0, Menit: 0, Detik: 0 })

// --- METHODS ---

// 1. Handle Buka Undangan (Start Experience)
const handleOpen = () => {
  isOpened.value = true
  
  // Logic Auto-Play Music
  if (audioRef.value) {
    audioRef.value.volume = 0.5 // Volume sedang
    const playPromise = audioRef.value.play()
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying.value = true
      }).catch((error) => {
        console.log("Autoplay prevented by browser:", error)
        isPlaying.value = false
      })
    }
  }

  // Refresh Animasi setelah transisi CSS selesai (1.2s)
  setTimeout(() => {
    ScrollTrigger.refresh()
    AOS.refresh()
  }, 1200)
}

// 2. Toggle Music via Navbar
const toggleMusic = () => {
  if (!audioRef.value) return
  
  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    audioRef.value.play()
    isPlaying.value = true
  }
}

// --- LIFECYCLE (OPTIMIZED) ---
onMounted(() => {
  // A. Init AOS (Matikan di Mobile agar performa ngebut)
  AOS.init({ 
    duration: 800, 
    once: true, 
    offset: 50,
    easing: 'ease-out-quad',
    disable: 'mobile' // PENTING: Anti-lag di HP
  })

  // B. Init LENIS (Scroll Mewah)
  const lenis = new Lenis({
    duration: 1.0, 
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false, // Gunakan native scroll di HP (Lebih ringan)
    touchMultiplier: 2,
  })
  
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // C. Countdown Timer Logic
  const timer = setInterval(() => {
    const now = Date.now()
    const d = targetDate - now

    if (d < 0) {
      clearInterval(timer)
      return
    }

    countdown.Hari = Math.floor(d / 86400000)
    countdown.Jam = Math.floor((d % 86400000) / 3600000)
    countdown.Menit = Math.floor((d % 3600000) / 60000)
    countdown.Detik = Math.floor((d % 60000) / 1000)
  }, 1000)

  // Cleanup
  onUnmounted(() => {
    lenis.destroy()
    clearInterval(timer)
    gsap.ticker.remove(lenis.raf)
  })
})
</script>

<template>
  <div class="relative min-h-screen font-sans bg-[#050505] text-white overflow-hidden selection:bg-gold-luxury selection:text-white">

    <div class="fixed inset-0 pointer-events-none z-[60]"
         style="background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);">
    </div>

    <div class="fixed inset-0 pointer-events-none opacity-[0.04] z-0"
         style="background-image: url('https://www.transparenttextures.com/patterns/stardust.png'); background-repeat: repeat;">
    </div>

    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <img src="https://www.transparenttextures.com/patterns/floral-white.png" 
           class="absolute -left-20 top-1/4 w-[300px] opacity-10 animate-float-slow" alt="" />
      <img src="https://www.transparenttextures.com/patterns/floral-white.png" 
           class="absolute -right-20 bottom-1/4 w-[300px] opacity-10 animate-float-slow-reverse" alt="" />
      
      <div class="absolute top-1/3 left-1/4 w-1 h-1 bg-gold-luxury rounded-full blur-[1px] animate-fly-1"></div>
      <div class="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-gold-luxury rounded-full blur-[1px] animate-fly-2"></div>
    </div>

    <Transition name="fade">
      <Opening v-if="!isOpened" @open="handleOpen" />
    </Transition>

    <audio ref="audioRef" loop src="/audio/wedding-song.mp3"></audio>

    <main 
      class="relative z-10 transition-opacity duration-[2000ms] ease-out will-change-transform"
      :class="isOpened ? 'opacity-100' : 'opacity-0 pointer-events-none h-screen overflow-hidden'"
    >
      
      <Navbar :is-playing="isPlaying" @toggle-music="toggleMusic" />

      <Hero :countdown="countdown" />

      <SectionDivider variant="classic" data-aos="fade-up" />

      <Couple />

      <SectionDivider variant="minimal" data-aos="fade-in" />

      <Event />

      <SectionDivider variant="floral" data-aos="zoom-in" />

      <Gallery />
      
      <SectionDivider variant="classic" data-aos="fade-up" />

      <Rsvp />

      <SectionDivider variant="minimal" data-aos="fade-in" />

      <Gift />

      <Footer />

    </main>
  </div>
</template>

<style>
/* CSS GLOBAL */

/* Lenis Scroll Setup */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }

/* Transisi Opening (Fade Out) */
.fade-leave-active { transition: opacity 1.5s ease-in-out 0.5s; }
.fade-leave-to { opacity: 0; }

/* Animations Keyframes (Global) */
@keyframes float-slow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}
@keyframes float-slow-reverse {
  0%, 100% { transform: translateY(0) rotate(180deg); }
  50% { transform: translateY(20px) rotate(175deg); }
}
@keyframes fly-1 {
  0% { transform: translate(0,0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translate(100px, -100px); opacity: 0; }
}
@keyframes fly-2 {
  0% { transform: translate(0,0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translate(-80px, -120px); opacity: 0; }
}

/* Helper Utility Classes */
.animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
.animate-float-slow-reverse { animation: float-slow-reverse 12s ease-in-out infinite; }
.animate-fly-1 { animation: fly-1 8s linear infinite; }
.animate-fly-2 { animation: fly-2 12s linear infinite; }
</style>

