<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// --- 1. IMPORT FOTO DARI ASSETS ---
// Pastikan nama file di folder 'src/assets/images' sesuai dengan import ini
import img1 from '../assets/images/gallery-1.jpg' 
import img2 from '../assets/images/gallery-2.jpg'
import img3 from '../assets/images/gallery-3.jpg'
import img4 from '../assets/images/gallery-4.jpg'

gsap.registerPlugin(ScrollTrigger)

// --- DATA 4 FOTO UTAMA ---
const photos = [
  { 
    id: 1,
    src: img1, // Menggunakan variabel import di atas
    title: 'The Proposal',
    subtitle: 'Awal dari segalanya'
  },
  { 
    id: 2,
    src: img2, 
    title: 'The Engagement',
    subtitle: 'Mengikat janji suci'
  },
  { 
    id: 3,
    src: img3, 
    title: 'Pre-Wedding',
    subtitle: 'Momen kebersamaan'
  },
  { 
    id: 4,
    src: img4, 
    title: 'The Vow',
    subtitle: 'Menuju keabadian'
  },
]

// State untuk mendeteksi mana yang sedang aktif (di-hover/tap)
const activeId = ref(1) // Default foto pertama terbuka

onMounted(() => {
  // Animasi Header Masuk
  gsap.from('.gallery-header', {
    scrollTrigger: { trigger: '#gallery', start: 'top 80%' },
    y: 30, opacity: 0, duration: 1
  })

  // Animasi Container Masuk
  gsap.from('.gallery-container', {
    scrollTrigger: { trigger: '#gallery', start: 'top 75%' },
    y: 50, opacity: 0, duration: 1.2, ease: 'power3.out'
  })
})
</script>

<template>
  <section id="gallery" class="relative py-20 px-4 bg-[#050505] overflow-hidden">
    
    <div class="bg-overlay bg-pattern-noise opacity-30"></div>
    
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-luxury/5 blur-[100px] rounded-full pointer-events-none"></div>

    <div class="relative z-10 container mx-auto max-w-6xl">
      
      <div class="gallery-header text-center mb-12">
        <p class="font-serif text-gold-luxury tracking-[0.3em] uppercase text-xs mb-2">Our Moments</p>
        <h2 class="font-script text-4xl md:text-5xl text-white drop-shadow-md">Cinematic Gallery</h2>
      </div>

      <div class="gallery-container flex flex-col md:flex-row h-[500px] md:h-[500px] gap-2 md:gap-4">
        
        <div 
          v-for="(photo, index) in photos" 
          :key="photo.id"
          @mouseenter="activeId = photo.id"
          @click="activeId = photo.id"
          class="relative overflow-hidden rounded-2xl cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group border border-white/10"
          :class="activeId === photo.id ? 'flex-[5]' : 'flex-[1]'"
        >
          
          <img 
            :src="photo.src" 
            class="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000"
            :class="activeId === photo.id ? 'grayscale-0 scale-100' : 'grayscale opacity-60 group-hover:opacity-80 scale-110'"
          />

          <div 
            class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500"
            :class="activeId === photo.id ? 'opacity-100' : 'opacity-0'"
          ></div>

          <div class="absolute top-4 left-4 z-20 mix-blend-overlay">
            <span class="font-serif text-4xl md:text-6xl font-bold text-white/20">0{{ index + 1 }}</span>
          </div>

          <div 
            class="absolute bottom-0 left-0 w-full p-6 md:p-8 transform transition-all duration-500 delay-100"
            :class="activeId === photo.id ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
          >
            <div class="w-12 h-0.5 bg-gold-luxury mb-4"></div>
            
            <h3 class="font-script text-3xl md:text-5xl text-gold-luxury mb-1 drop-shadow-lg whitespace-nowrap">
              {{ photo.title }}
            </h3>
            <p class="font-serif text-white/80 text-xs tracking-widest uppercase opacity-0 animate-[fadeIn_1s_ease_forwards_0.5s]" v-if="activeId === photo.id">
              {{ photo.subtitle }}
            </p>
          </div>

          <div 
            class="hidden md:flex absolute inset-0 items-center justify-center transition-opacity duration-300 pointer-events-none"
            :class="activeId !== photo.id ? 'opacity-100' : 'opacity-0'"
          >
            <p class="text-white/40 text-xs tracking-[0.4em] uppercase font-bold rotate-90 whitespace-nowrap">
              {{ photo.title }}
            </p>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
/* Transisi Flexbox Smooth */
.transition-\[flex\] {
  transition-property: flex;
}
</style>

