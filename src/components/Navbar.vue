<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isPlaying: Boolean
})

const emit = defineEmits(['toggle-music'])

const menuItems = [
  { id: 'hero', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Home' },
  { id: 'couple', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', label: 'Couple' },
  { id: 'event', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Event' },
  { id: 'gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Gallery' },
  { id: 'rsvp', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'RSVP' },
]

// Fungsi Scroll Halus
const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    // Menggunakan lenis/native scroll
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <nav class="fixed bottom-6 left-0 w-full z-50 px-4 pointer-events-none">
    
    <div class="max-w-md mx-auto flex items-end justify-between gap-4">

      <div class="pointer-events-auto flex-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] flex justify-between items-center">
        
        <button 
          v-for="item in menuItems" 
          :key="item.id"
          @click="scrollTo(item.id)"
          class="group relative flex flex-col items-center justify-center gap-1 w-10 h-10 text-white/50 hover:text-gold-luxury transition-colors duration-300"
        >
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="item.icon" />
          </svg>
          
          <span class="absolute -bottom-2 text-[8px] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-medium tracking-wide uppercase text-gold-luxury">
            {{ item.label }}
          </span>

          <span class="absolute top-0 w-1 h-1 bg-gold-luxury rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </button>

      </div>

      <button 
        @click="emit('toggle-music')"
        class="pointer-events-auto relative w-14 h-14 rounded-full bg-black border border-white/10 shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-center group overflow-hidden"
      >
        <div 
          class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-50"
          :class="isPlaying ? 'animate-spin-slow' : ''"
        ></div>
        
        <div class="relative z-10 w-8 h-8 bg-charcoal/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-gold-luxury/30">
          <svg v-if="isPlaying" class="w-4 h-4 text-gold-luxury animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          <svg v-else class="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" stroke-miterlimit="10"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        </div>

        <div class="absolute inset-0 border-2 border-gold-luxury/30 rounded-full" :class="isPlaying ? 'animate-ping opacity-20' : 'opacity-0'"></div>
      </button>

    </div>
  </nav>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 4s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>

