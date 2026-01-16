<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  variant: {
    type: String, // 'classic', 'minimal', 'floral'
    default: 'classic'
  }
})

const container = ref(null)

onMounted(() => {
  const el = container.value
  
  // 1. ANIMASI GAMBAR (Draw In)
  // Garis muncul saat discroll
  gsap.fromTo(el.querySelectorAll('.draw-path'), 
    { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 },
    { 
      strokeDashoffset: 0, 
      opacity: 1, 
      duration: 2.5, 
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%' }
    }
  )

  // 2. ANIMASI TENGAH (Pop Up)
  gsap.fromTo(el.querySelectorAll('.center-elem'),
    { scale: 0, opacity: 0, rotation: -90 },
    { 
      scale: 1, 
      opacity: 1, 
      rotation: 0,
      duration: 1.5, 
      ease: 'back.out(2)', 
      delay: 0.5,
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onComplete: () => {
        // 3. ANIMASI LOOPING (Perpetual Motion)
        // Setelah muncul, elemen tengah berputar pelan selamanya
        gsap.to(el.querySelectorAll('.center-elem'), {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none'
        })
        
        // Efek "Bernafas" pada garis
        gsap.to(el.querySelectorAll('.draw-path'), {
          strokeOpacity: 0.4,
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        })
      }
    }
  )
})
</script>

<template>
  <div 
    ref="container"
    class="w-full flex justify-center items-center py-20 md:py-28 pointer-events-none overflow-hidden relative z-20"
  >
    
    <svg width="0" height="0">
      <defs>
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#8B7330" />
          <stop offset="50%" stop-color="#FCE694" /> <stop offset="100%" stop-color="#8B7330" />
        </linearGradient>
      </defs>
    </svg>

    <div v-if="variant === 'classic'" class="relative w-full max-w-[300px] md:max-w-[400px]">
      <svg class="w-full h-auto drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]" viewBox="0 0 400 30" fill="none">
        <path class="draw-path" d="M0 15 C 50 15, 80 5, 120 5 C 160 5, 180 15, 200 15 C 220 15, 240 5, 280 5 C 320 5, 350 15, 400 15" 
              stroke="url(#gold-grad)" stroke-width="1" stroke-linecap="round" fill="none"/>
        
        <path class="draw-path" d="M180 20 Q 200 30, 220 20" stroke="url(#gold-grad)" stroke-width="0.5" opacity="0.6" />

        <g class="center-elem origin-center" style="transform-box: fill-box; transform-origin: center;">
          <rect x="194" y="9" width="12" height="12" transform="rotate(45 200 15)" fill="#050505" stroke="url(#gold-grad)" stroke-width="1" />
          <rect x="197" y="12" width="6" height="6" transform="rotate(45 200 15)" fill="url(#gold-grad)" />
        </g>
      </svg>
    </div>

    <div v-else-if="variant === 'minimal'" class="relative w-full max-w-lg px-8 flex items-center justify-center gap-4">
      <div class="h-[0.5px] w-full bg-gradient-to-r from-transparent via-gold-luxury to-gold-luxury/20 opacity-60 draw-path origin-right scale-x-0" 
           style="animation: growLine 2s ease-out forwards"></div>
      
      <div class="relative w-6 h-6 flex items-center justify-center center-elem">
        <svg viewBox="0 0 24 24" class="w-full h-full text-gold-luxury drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" fill="currentColor">
           <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
        </svg>
        <div class="absolute inset-0 bg-gold-luxury/30 blur-[6px] rounded-full animate-pulse"></div>
      </div>

      <div class="h-[0.5px] w-full bg-gradient-to-l from-transparent via-gold-luxury to-gold-luxury/20 opacity-60 draw-path origin-left scale-x-0" 
           style="animation: growLine 2s ease-out forwards"></div>
    </div>

    <div v-else-if="variant === 'floral'" class="relative w-full max-w-xs">
      <svg class="w-full h-auto" viewBox="0 0 300 40" fill="none">
        <path class="draw-path" d="M0 20 C 80 20, 100 35, 150 35 C 200 35, 220 20, 300 20" 
              stroke="url(#gold-grad)" stroke-width="0.8" stroke-linecap="round" />
        
        <path class="draw-path" d="M120 30 Q 110 20, 100 30 M 180 30 Q 190 20, 200 30" 
              stroke="url(#gold-grad)" stroke-width="0.5" />
        
        <g class="center-elem origin-center" style="transform-box: fill-box; transform-origin: center;">
           <circle cx="150" cy="35" r="4" fill="#050505" stroke="url(#gold-grad)" stroke-width="1" />
           <path d="M150 29 V 25 M 150 41 V 45 M 144 35 H 140 M 156 35 H 160" stroke="url(#gold-grad)" stroke-width="0.5" />
        </g>
      </svg>
    </div>

  </div>
</template>

<style scoped>
@keyframes growLine {
  to { transform: scaleX(1); }
}
</style>

