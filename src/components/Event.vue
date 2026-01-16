<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const section = ref(null)
const cards = ref([])

const events = [
  {
    title: 'Akad Nikah',
    date: 'Sabtu, 14 Feb 2026',
    time: '08:00 - 10:00 WIB',
    location: 'Grand Ballroom',
    address: 'Hotel Mulia Senayan',
    mapLink: 'https://goo.gl/maps/placeholder'
  },
  {
    title: 'Resepsi',
    date: 'Sabtu, 14 Feb 2026',
    time: '11:00 - 14.00 WIB',
    location: 'Grand Ballroom',
    address: 'Hotel Mulia Senayan',
    mapLink: 'https://goo.gl/maps/placeholder'
  }
]

// --- 1. ADVANCED 3D PARALLAX + SPOTLIGHT ---
const handleMouseMove = (e, index) => {
  const card = cards.value[index]
  if (!card) return

  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  // Update CSS Variables untuk Spotlight Effect
  card.style.setProperty('--mouse-x', `${x}px`)
  card.style.setProperty('--mouse-y', `${y}px`)

  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  // Rotasi Kartu (Wadah Utama)
  const rotateX = ((y - centerY) / centerY) * -3 
  const rotateY = ((x - centerX) / centerX) * 3

  // Animasi Kartu
  gsap.to(card, {
    rotateX: rotateX,
    rotateY: rotateY,
    scale: 1.02,
    duration: 0.5,
    ease: 'power2.out',
    transformPerspective: 1000,
    overwrite: 'auto'
  })

  // Animasi Konten Dalam (Internal Parallax)
  // Konten bergerak berlawanan arah sedikit agar terlihat "mengapung" di dalam kaca
  gsap.to(card.querySelector('.inner-content'), {
    x: (x - centerX) * 0.05, // Geser dikit
    y: (y - centerY) * 0.05,
    duration: 0.5,
    ease: 'power2.out'
  })
}

const resetCard = (index) => {
  const card = cards.value[index]
  if (!card) return
  
  // Reset Kartu
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 0.8,
    ease: 'power3.out',
    overwrite: 'auto'
  })

  // Reset Konten
  gsap.to(card.querySelector('.inner-content'), {
    x: 0,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
}

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: section.value, start: 'top 70%' }
  })

  // Entrance Title
  tl.from('.evt-title', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' })
  
  // Cards Reveal
  .from(cards.value, {
    y: 60,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: 'back.out(1.5)',
    clearProps: 'transform' // Bersihkan agar 3D tilt jalan normal
  }, '-=0.8')

  // --- DRAWING LINE ANIMATION (Garis Emas Menggambar Diri) ---
  gsap.fromTo('.drawing-line', 
    { height: '0%' }, 
    { 
      height: '100%', 
      ease: 'none', 
      scrollTrigger: {
        trigger: section.value,
        start: 'top 40%',
        end: 'bottom 80%',
        scrub: 1.5 // Smooth drawing
      }
    }
  )

  // Floating Particles Animation (Loop)
  gsap.to('.particle', {
    y: -100,
    opacity: 0,
    duration: "random(3, 6)",
    stagger: {
      amount: 5,
      repeat: -1
    },
    ease: "none"
  })
})
</script>

<template>
  <section ref="section" class="relative py-24 lg:py-32 px-4 bg-[#050505] overflow-hidden">
    
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-for="n in 10" :key="n" 
           class="particle absolute w-1 h-1 bg-gold-luxury/30 rounded-full blur-[1px]"
           :style="{ left: Math.random() * 100 + '%', top: Math.random() * 100 + 20 + '%' }">
      </div>
    </div>

    <div class="absolute top-0 left-0 w-48 h-48 opacity-10 pointer-events-none">
      <svg viewBox="0 0 100 100" class="w-full h-full stroke-gold-luxury fill-none" stroke-width="0.5">
         <path d="M0 0 Q 50 0 50 50" />
         <path d="M10 10 Q 50 10 50 50" opacity="0.5"/>
      </svg>
    </div>
    <div class="absolute bottom-0 right-0 w-48 h-48 opacity-10 pointer-events-none rotate-180">
      <svg viewBox="0 0 100 100" class="w-full h-full stroke-gold-luxury fill-none" stroke-width="0.5">
         <path d="M0 0 Q 50 0 50 50" />
         <path d="M10 10 Q 50 10 50 50" opacity="0.5"/>
      </svg>
    </div>

    <div class="relative z-10 max-w-3xl mx-auto">
      
      <div class="text-center mb-16 evt-title">
        <div class="inline-flex items-center justify-center gap-3 mb-2">
          <span class="w-2 h-2 rounded-full border border-gold-luxury/50"></span>
          <p class="font-serif text-[10px] tracking-[0.4em] text-white/50 uppercase">The Schedule</p>
          <span class="w-2 h-2 rounded-full border border-gold-luxury/50"></span>
        </div>
        <h2 class="font-script text-4xl md:text-5xl text-white drop-shadow-lg">Wedding Event</h2>
      </div>

      <div class="relative grid md:grid-cols-2 gap-8 lg:gap-12 justify-items-center">
        
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
          <div class="absolute inset-0 bg-white/5"></div>
          <div class="drawing-line absolute top-0 left-0 w-full bg-gradient-to-b from-gold-luxury via-white/80 to-gold-luxury shadow-[0_0_15px_#D4AF37]">
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-4 bg-white blur-[2px] rounded-full"></div>
          </div>
        </div>

        <div 
          v-for="(event, index) in events" 
          :key="index"
          class="relative w-full flex flex-col items-center"
          :class="index === 1 ? 'md:mt-24' : ''"
        >
          <div
            ref="cards"
            class="group relative w-full max-w-[320px] will-change-transform transform-gpu cursor-default"
            @mousemove="(e) => handleMouseMove(e, index)"
            @mouseleave="() => resetCard(index)"
          >
            <div class="absolute -inset-[1px] rounded-[21px] bg-gradient-to-b from-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div class="relative overflow-hidden rounded-[20px] bg-[#0c0c0c] p-6 backdrop-blur-md shadow-2xl transition-all duration-500">
              
              <div 
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style="background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%);"
              ></div>

              <div class="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" 
                   style="background-image: url('https://www.transparenttextures.com/patterns/stardust.png');">
              </div>

              <div class="inner-content relative z-10 flex flex-col items-center text-center">
                
                <div class="absolute -top-3 px-4 py-1 rounded-full border border-[#D4AF37]/30 bg-[#080808] shadow-lg transform -translate-y-1/2 group-hover:-translate-y-1 transition-transform duration-300">
                   <p class="text-[9px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">{{ event.date }}</p>
                </div>

                <h3 class="font-serif text-2xl text-white mt-4 mb-2 tracking-wide group-hover:text-gold-luxury transition-colors duration-300">{{ event.title }}</h3>
                
                <div class="w-12 h-px bg-white/10 mb-6 group-hover:w-24 transition-all duration-500 ease-out"></div>

                <div class="grid grid-cols-1 gap-4 w-full">
                  
                  <div class="flex items-center gap-3 bg-white/[0.03] rounded-lg p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                    <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gold-luxury">
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div class="text-left">
                      <p class="text-[9px] text-white/40 uppercase tracking-wider">Waktu</p>
                      <p class="text-xs text-white/90 font-medium">{{ event.time }}</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 bg-white/[0.03] rounded-lg p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                    <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gold-luxury">
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div class="text-left">
                      <p class="text-[9px] text-white/40 uppercase tracking-wider">Lokasi</p>
                      <p class="text-xs text-white/90 font-medium">{{ event.location }}</p>
                      <p class="text-[10px] text-white/50 leading-tight mt-0.5">{{ event.address }}</p>
                    </div>
                  </div>

                </div>

                <a :href="event.mapLink" target="_blank" class="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-gold-luxury transition-all duration-300 group/link">
                  <span>Google Maps</span>
                  <svg class="w-3 h-3 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>

              </div>
            </div>
          </div>
          
          <div class="hidden md:block absolute top-1/2 w-2 h-2 rounded-full bg-[#050505] border border-gold-luxury z-20"
               :class="index % 2 === 0 ? '-right-[28px] lg:-right-[52px] translate-x-1/2' : '-left-[28px] lg:-left-[52px] -translate-x-1/2'">
             <div class="absolute inset-0 bg-gold-luxury blur-[4px] opacity-50 animate-pulse"></div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Pastikan container support 3D */
.perspective-container {
  perspective: 1000px;
}
</style>

