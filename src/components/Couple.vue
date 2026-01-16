<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// --- IMPORT GAMBAR LOKAL ---
// Menggunakan relative path dari src/components/ ke src/assets/images/
import groomImg from '../assets/images/groom.jpg'
import brideImg from '../assets/images/bridge.jpg' // Sesuai instruksi 'bridge.jpg'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // 1. ANIMASI FLOATING (LEVITASI PERMANEN)
  gsap.to('.levitate-groom', {
    y: -15, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut'
  })
  gsap.to('.levitate-bride', {
    y: -15, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5
  })

  // 2. ANIMASI SCROLL TRIGGER
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#couple',
      start: 'top 75%'
    }
  })

  // Urutan Animasi: Quote Dulu -> Header -> Kartu Foto
  tl.from('.couple-quote', { y: 30, opacity: 0, duration: 1.5, ease: 'power2.out' })
    .from('.couple-header', { y: 20, opacity: 0, duration: 1 }, '-=1')
    .from('.couple-card-wrapper', { 
      y: 100, opacity: 0, duration: 1.2, stagger: 0.3, ease: 'back.out(1.2)' 
    }, '-=0.5')
    .from('.love-knot-path', {
      strokeDashoffset: 1000, duration: 2, ease: 'power2.inOut'
    }, '-=1')
})
</script>

<template>
  <section id="couple" class="relative py-24 px-6 bg-charcoal overflow-hidden">
    
    <div class="absolute inset-0 opacity-[0.03]" 
         style="background-image: url('https://www.transparenttextures.com/patterns/cubes.png');">
    </div>

    <div class="relative z-10 container mx-auto max-w-5xl">
      
      <div class="couple-quote text-center mb-12 max-w-3xl mx-auto px-4">
        <div class="flex justify-center mb-6 opacity-60">
           <svg class="w-8 h-8 text-gold-luxury" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>

        <p class="font-serif text-white/90 text-sm md:text-lg italic leading-relaxed drop-shadow-md">
          "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."
        </p>
        
        <div class="mt-4 flex items-center justify-center gap-4">
          <div class="h-px w-8 bg-gold-luxury/50"></div>
          <p class="font-serif text-gold-luxury text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">
            QS. Ar-Rum: 21
          </p>
          <div class="h-px w-8 bg-gold-luxury/50"></div>
        </div>
      </div>

      <div class="couple-header text-center mb-16 md:mb-20">
        <h2 class="font-script text-4xl md:text-6xl text-white drop-shadow-lg mb-2">
          We Are Getting Married
        </h2>
        <p class="font-serif text-white/40 tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
          The Bride & The Groom
        </p>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 relative">

        <div class="couple-card-wrapper levitate-groom relative z-10 w-64 md:w-72 flex-shrink-0 text-center">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold-luxury/20 blur-[60px] rounded-full pointer-events-none animate-pulse-slow"></div>

          <div class="group relative">
            <div class="absolute -inset-1 rounded-t-full rounded-b-[100px] bg-gradient-to-b from-gold-luxury via-yellow-200 to-gold-luxury opacity-60 blur-[1px]"></div>
            
            <div class="relative h-80 w-full rounded-t-full rounded-b-[100px] overflow-hidden border-[3px] border-charcoal shadow-2xl">
              <div class="absolute inset-0 bg-gradient-to-tr from-gold-luxury/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"></div>
              
              <img 
                :src="groomImg" 
                class="w-full h-full object-cover transform transition-transform duration-[1.5s] group-hover:scale-110 grayscale group-hover:grayscale-0"
                alt="Groom"
              />
            </div>

            <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[120%]">
              <h3 class="gradient-gold-text font-script text-4xl md:text-5xl drop-shadow-xl relative z-10" data-text="Romeo">Romeo</h3>
              <p class="font-serif text-[10px] text-white/60 uppercase tracking-widest mt-1 bg-charcoal/80 backdrop-blur-md py-1 px-3 rounded-full inline-block border border-white/10">
                Putra Bpk. Montague
              </p>
            </div>
          </div>
        </div>

        <div class="relative w-32 h-32 md:w-48 md:h-24 flex items-center justify-center shrink-0 z-0 opacity-60">
           <svg viewBox="0 0 200 100" class="w-full h-full overflow-visible">
             <path d="M 0,50 C 50,50 50,10 100,50 C 150,90 150,50 200,50" fill="none" stroke="url(#goldGradient)" stroke-width="1.5" class="love-knot-path" stroke-dasharray="1000" stroke-dashoffset="0" />
             <defs>
               <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stop-color="transparent" />
                 <stop offset="20%" stop-color="#D4AF37" />
                 <stop offset="80%" stop-color="#D4AF37" />
                 <stop offset="100%" stop-color="transparent" />
               </linearGradient>
             </defs>
           </svg>
           <div class="absolute inset-0 flex items-center justify-center">
             <div class="w-8 h-8 rounded-full bg-gold-luxury rotate-45 animate-spin-slow shadow-[0_0_15px_#D4AF37]"></div>
             <span class="absolute text-charcoal font-bold text-xs">&</span>
           </div>
        </div>

        <div class="couple-card-wrapper levitate-bride relative z-10 w-64 md:w-72 flex-shrink-0 text-center">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold-luxury/20 blur-[60px] rounded-full pointer-events-none animate-pulse-slow"></div>

          <div class="group relative">
            <div class="absolute -inset-1 rounded-t-full rounded-b-[100px] bg-gradient-to-b from-gold-luxury via-yellow-200 to-gold-luxury opacity-60 blur-[1px]"></div>
            
            <div class="relative h-80 w-full rounded-t-full rounded-b-[100px] overflow-hidden border-[3px] border-charcoal shadow-2xl">
              <div class="absolute inset-0 bg-gradient-to-tr from-gold-luxury/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"></div>
              
              <img 
                :src="brideImg" 
                class="w-full h-full object-cover transform transition-transform duration-[1.5s] group-hover:scale-110 grayscale group-hover:grayscale-0"
                alt="Bride"
              />
            </div>

            <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[120%]">
              <h3 class="gradient-gold-text font-script text-4xl md:text-5xl drop-shadow-xl relative z-10" data-text="Juliet">Juliet</h3>
              <p class="font-serif text-[10px] text-white/60 uppercase tracking-widest mt-1 bg-charcoal/80 backdrop-blur-md py-1 px-3 rounded-full inline-block border border-white/10">
                Putri Bpk. Capulet
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
/* Reuse style emas 3d */
.gradient-gold-text {
  background: linear-gradient(to bottom, #cfc09f 0%, #ffecb3 20%, #a88d45 40%, #ffecb3 70%, #9c8438 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  filter: drop-shadow(0px 2px 0px rgba(168, 141, 69, 0.5));
  position: relative;
  display: inline-block;
}
.gradient-gold-text::after {
  content: attr(data-text);
  position: absolute; left: 0; top: 0; width: 100%; height: 100%;
  background: linear-gradient(120deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.8) 50%, transparent 60%, transparent 100%);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  opacity: 0; animation: shine 4s infinite ease-in-out; pointer-events: none;
}
@keyframes shine { 0%, 80% { opacity: 0; background-position: -200%; } 90% { opacity: 1; } 100% { opacity: 0; background-position: 200%; } }
@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 10s linear infinite; }
</style>

