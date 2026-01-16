<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- DATA REKENING ---
const accounts = [
  {
    id: 'bca',
    bank: 'BCA',
    number: '1234567890',
    holder: 'Romeo Montague',
    // Gradient Mewah (Hitam Kebiruan)
    bgClass: 'bg-gradient-to-br from-[#1a1c20] via-[#0f1012] to-[#000000]',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg' 
  },
  {
    id: 'dana',
    bank: 'DANA',
    number: '081234567890',
    holder: 'Juliet Capulet',
    // Gradient Mewah (Emas Gelap)
    bgClass: 'bg-gradient-to-br from-[#4a3b18] via-[#2a220e] to-[#1a1508]',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg'
  }
]

// State Address (Kado Fisik)
const showAddress = ref(false)
const copiedId = ref(null)

// --- LOGIC 3D TILT EFFECT ---
const handleMouseMove = (e, index) => {
  const card = document.getElementById(`card-${index}`)
  const glare = document.getElementById(`glare-${index}`)
  
  if (!card || !glare) return

  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  // Hitung rotasi (Maksimal 15 derajat)
  const rotateX = ((y - centerY) / centerY) * -15
  const rotateY = ((x - centerX) / centerX) * 15

  // Terapkan Transform ke Kartu
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
  
  // Gerakkan Glare (Pantulan Cahaya)
  glare.style.transform = `translateX(${x}px) translateY(${y}px)`
  glare.style.opacity = '1'
}

const resetCard = (index) => {
  const card = document.getElementById(`card-${index}`)
  const glare = document.getElementById(`glare-${index}`)
  
  if (!card || !glare) return
  
  // Reset ke posisi semula
  card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
  glare.style.opacity = '0'
}

// --- LOGIC COPY (YANG DIPERBAIKI) ---
const copyToClipboard = async (text, id) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => { copiedId.value = null }, 2000)
  } catch (err) {
    // Tambahkan kurung kurawal di sini
    console.error(err)
  }
}

onMounted(() => {
  // Animasi Header
  gsap.from('.gift-header', {
    scrollTrigger: { trigger: '#gift', start: 'top 80%' },
    y: 30, opacity: 0, duration: 1
  })

  // Animasi Kartu Masuk
  gsap.from('.gift-card-wrapper', {
    scrollTrigger: { trigger: '#gift', start: 'top 75%' },
    y: 100, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out'
  })
})
</script>

<template>
  <section id="gift" class="relative py-24 px-6 bg-charcoal overflow-hidden">
    
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
       <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
         <defs>
           <pattern id="security_pattern" width="40" height="40" patternUnits="userSpaceOnUse">
             <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#D4AF37" stroke-width="1" fill="none"/>
           </pattern>
         </defs>
         <rect width="100%" height="100%" fill="url(#security_pattern)"/>
       </svg>
    </div>

    <div class="relative z-10 container mx-auto max-w-4xl">
      
      <div class="gift-header text-center mb-16">
        <h2 class="font-script text-4xl md:text-5xl text-gold-luxury drop-shadow-md mb-3">Wedding Gift</h2>
        <p class="font-serif text-white/60 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
          Tanpa mengurangi rasa hormat, bagi Anda yang ingin memberikan tanda kasih untuk kami, dapat melalui:
        </p>
      </div>

      <div class="flex flex-col md:flex-row justify-center items-center gap-10">
        
        <div 
          v-for="(acc, index) in accounts" 
          :key="acc.id"
          class="gift-card-wrapper relative group w-full max-w-[340px] h-[210px] cursor-pointer"
          @mousemove="handleMouseMove($event, index)"
          @mouseleave="resetCard(index)"
          @click="copyToClipboard(acc.number, acc.id)"
        >
          <div 
             class="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-charcoal px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 pointer-events-none z-20"
             :class="copiedId === acc.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'"
          >
            Nomor Disalin! ✅
          </div>

          <div 
            :id="`card-${index}`"
            class="relative w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-2xl transition-transform duration-200 ease-out border border-white/10 overflow-hidden"
            :class="acc.bgClass"
            style="transform-style: preserve-3d;"
          >
            
            <div 
              :id="`glare-${index}`"
              class="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_60%)] opacity-0 pointer-events-none mix-blend-overlay transition-opacity duration-200"
            ></div>

            <div class="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style="background-image: url('https://www.transparenttextures.com/patterns/stardust.png');"></div>

            <div class="relative z-10 pointer-events-none">
              
              <div class="flex justify-between items-start mb-6">
                 <div class="w-11 h-8 bg-gradient-to-br from-[#ffeccf] to-[#d4af37] rounded-md border border-black/10 shadow-inner flex items-center justify-center relative overflow-hidden">
                    <div class="absolute w-full h-[1px] bg-black/20 top-1/2 -translate-y-1/2"></div>
                    <div class="absolute h-full w-[1px] bg-black/20 left-1/2 -translate-x-1/2"></div>
                    <div class="absolute w-6 h-4 border border-black/20 rounded-full"></div>
                 </div>
                 <span class="font-bold text-lg text-white/80 italic tracking-widest">{{ acc.bank }}</span>
              </div>

              <div class="mb-6">
                <p class="font-mono text-2xl text-white tracking-widest drop-shadow-[1px_1px_0px_rgba(0,0,0,0.8)]" style="text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                  {{ acc.number.replace(/(\d{4})(?=\d)/g, '$1 ') }}
                </p>
                <p class="text-[8px] text-gold-luxury/80 uppercase tracking-[0.3em] mt-1">Tap Card to Copy</p>
              </div>

              <div>
                <p class="font-serif text-sm text-white/70 uppercase tracking-widest">{{ acc.holder }}</p>
              </div>

            </div>

            <div class="absolute bottom-6 right-6 flex -space-x-3 opacity-60 grayscale">
              <div class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md"></div>
              <div class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md"></div>
            </div>

          </div>
        </div>

      </div>

      <div class="mt-16 text-center">
        <button 
          @click="showAddress = !showAddress"
          class="group inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-white/60 hover:text-gold-luxury hover:border-gold-luxury transition-all duration-300"
        >
          <span class="text-xs uppercase tracking-widest font-bold">
            {{ showAddress ? 'Tutup Alamat' : 'Kirim Kado Fisik' }}
          </span>
          <svg class="w-4 h-4 transition-transform duration-300" :class="showAddress ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>

        <div 
          class="overflow-hidden transition-all duration-500 ease-in-out"
          :class="showAddress ? 'max-h-60 opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'"
        >
          <div class="bg-black/30 border border-gold-luxury/20 rounded-2xl p-6 max-w-lg mx-auto backdrop-blur-sm relative group">
             <button 
               @click="copyToClipboard('Jl. Mawar Melati Indah No. 123, RT 01/RW 02, Jakarta Selatan, 12345', 'addr')" 
               class="absolute top-4 right-4 text-white/30 hover:text-gold-luxury transition-colors"
               title="Salin Alamat"
             >
               <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
             </button>

             <span v-if="copiedId === 'addr'" class="absolute top-4 right-12 text-[10px] text-green-400 font-bold uppercase tracking-wider animate-pulse">Tersalin!</span>

             <p class="text-gold-luxury text-xs uppercase tracking-widest mb-2">Alamat Pengiriman</p>
             <p class="text-white font-serif leading-relaxed">
               Jl. Mawar Melati Indah No. 123<br>
               RT 01 / RW 02, Kec. Kebayoran Baru<br>
               Jakarta Selatan, 12345
             </p>
             <p class="text-white/40 text-[10px] mt-4 uppercase tracking-widest">Penerima: Romeo Montague (0812-3456-7890)</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

