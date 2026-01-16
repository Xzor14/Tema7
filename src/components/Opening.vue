<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const bgImage = '/images/opening-ornate.jpg'
const emit = defineEmits(['open'])
const isOpening = ref(false) // State lokal untuk trigger animasi CSS/GSAP
const guestName = ref('Tamu Undangan')

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const to = params.get('to') || params.get('u')
  if (to) guestName.value = to
})

const openInvitation = () => {
  // 1. STATE LOKAL AKTIF (Untuk animasi tombol/konten)
  isOpening.value = true

  // 2. KIRIM SINYAL LANGSUNG KE APP.VUE! (KUNCI SUPER SMOOTH)
  // App.vue akan langsung memutar musik & memunculkan Hero
  emit('open')

  // 3. JALANKAN ANIMASI PINTU (Visual saja)
  const tl = gsap.timeline()

  // Konten tengah hilang instan
  tl.to('.seal-content', {
    scale: 1.1,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in'
  })

  // Pintu terbuka lebar
  .to('.door-left', {
    x: '-100%',
    duration: 2.2, // Agak lambat biar elegan
    ease: 'power4.inOut'
  }, '-=0.3')
  .to('.door-right', {
    x: '100%',
    duration: 2.2,
    ease: 'power4.inOut'
  }, '<')
}
</script>

<template>
  <div class="fixed inset-0 z-[999] flex overflow-hidden pointer-events-auto">
    
    <div 
      class="door-left absolute left-0 top-0 w-1/2 h-full z-20 border-r border-gold-luxury/30 shadow-2xl bg-cover bg-no-repeat"
      :style="{ backgroundImage: `url('${bgImage}')`, backgroundPosition: 'left center' }"
    >
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <div 
      class="door-right absolute right-0 top-0 w-1/2 h-full z-20 border-l border-gold-luxury/30 shadow-2xl bg-cover bg-no-repeat"
      :style="{ backgroundImage: `url('${bgImage}')`, backgroundPosition: 'right center' }"
    >
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <div class="seal-content absolute z-30 inset-0 flex flex-col items-center justify-center text-center p-6">
      <p class="font-serif text-white/80 tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 animate-pulse drop-shadow-md">
        The Wedding Celebration Of
      </p>

      <h1 class="font-script text-5xl md:text-7xl lg:text-8xl text-gold-luxury mb-8 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] leading-tight">
        Romeo & Juliet
      </h1>

      <div class="mb-8 w-full max-w-xs bg-black/40 backdrop-blur-sm border border-gold-luxury/30 p-4 rounded-xl shadow-lg transform transition-all duration-700" :class="isOpening ? 'scale-90 opacity-0' : 'scale-100 opacity-100'">
        <p class="text-[9px] text-white/60 uppercase tracking-widest mb-1">Kepada Yth.</p>
        <h3 class="font-serif text-xl md:text-2xl text-white font-medium capitalize break-words">
          {{ guestName }}
        </h3>
      </div>

      <button 
        @click="openInvitation" 
        class="group relative mb-8 px-8 py-3 bg-gold-luxury/10 backdrop-blur-md border border-gold-luxury rounded-full overflow-hidden transition-all duration-500 hover:bg-gold-luxury hover:text-charcoal hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] cursor-pointer z-50"
      >
        <span class="relative z-10 font-serif text-xs tracking-[0.3em] uppercase font-bold flex items-center justify-center gap-2">
          Buka Undangan
        </span>
        <div class="absolute inset-0 -translate-x-full group-hover:animate-[shine_1s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      </button>

      <p class="text-[9px] md:text-[10px] text-white/60 tracking-widest uppercase max-w-xs leading-relaxed">
        Mohon maaf apabila ada kesalahan<br>penulisan nama/gelar
      </p>
    </div>
  </div>
</template>

