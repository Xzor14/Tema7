<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- CONFIG ---
const phoneNumber = "6283102113849" // Ganti dengan No WA Anda

// State Form
const form = ref({
  name: '', // Akan diisi otomatis dari URL
  guests: 1,
  status: 'Hadir',
  message: ''
})

const isSending = ref(false)

// --- LOGIC KIRIM PESAN ---
const sendMessage = () => {
  if (!form.value.name) return alert("Mohon isi nama Anda.")
  
  isSending.value = true

  setTimeout(() => {
    // 1. Timestamp
    const timestamp = new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })

    // 2. Header & Detail
    let statusHeader = ''
    let details = ''

    if (form.value.status === 'Hadir') {
      statusHeader = '✅ KONFIRMASI HADIR'
      details = `
👤 *Nama:* ${form.value.name}
💌 *Status:* ${form.value.status}
👥 *Jumlah Tamu:* ${form.value.guests} Orang
`
    } else {
      statusHeader = '❌ KONFIRMASI BERHALANGAN'
      details = `
👤 *Nama:* ${form.value.name}
💌 *Status:* Berhalangan / Maaf
`
    }

    // 3. Format Pesan
    const text = `
⚜️ *THE WEDDING OF ROMEO & JULIET* ⚜️

Kepada Mempelai,
Berikut detail konfirmasi buku tamu digital:

${statusHeader}
----------------------------------
${details.trim()}
🕒 *Waktu Input:* ${timestamp}
----------------------------------

📝 *Ucapan & Doa:*
"${form.value.message || 'Semoga lancar sampai hari H, aamiin.'}"

Terima kasih. Sampai jumpa di hari bahagia! 🕊️
    `.trim()
    
    // 4. Kirim
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    isSending.value = false
  }, 1500)
}

const triggerConfetti = () => {
  form.value.status = 'Hadir'
  gsap.fromTo('.confetti-icon', 
    { scale: 0.5, opacity: 0 }, 
    { scale: 1.2, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
  )
}

onMounted(() => {
  // ----------------------------------------------------
  // 1. LOGIC AMBIL NAMA DARI URL (AUTO-FILL)
  // ----------------------------------------------------
  const params = new URLSearchParams(window.location.search)
  // Cek parameter 'to' atau 'u' (umum dipakai undangan digital)
  const guestName = params.get('to') || params.get('u')
  
  if (guestName) {
    form.value.name = guestName
  }

  // ----------------------------------------------------
  // 2. ANIMASI
  // ----------------------------------------------------
  gsap.from('.rsvp-glass', {
    scrollTrigger: { trigger: '#rsvp', start: 'top 70%' },
    y: 80, opacity: 0, duration: 1.5, ease: 'power3.out'
  })

  gsap.to('.aurora-blob', {
    x: "random(-50, 50)",
    y: "random(-50, 50)",
    scale: "random(0.8, 1.2)",
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 1
  })
})
</script>

<template>
  <section id="rsvp" class="relative py-28 px-4 bg-charcoal overflow-hidden flex justify-center items-center">
    
    <div class="absolute inset-0 opacity-[0.05]" style="background-image: url('https://www.transparenttextures.com/patterns/stardust.png');"></div>

    <div class="absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-center">
      <div class="aurora-blob absolute w-96 h-96 bg-gold-luxury/20 rounded-full blur-[100px] -top-20 -left-20 mix-blend-screen"></div>
      <div class="aurora-blob absolute w-80 h-80 bg-purple-500/10 rounded-full blur-[80px] top-1/2 right-0 mix-blend-screen"></div>
      <div class="aurora-blob absolute w-64 h-64 bg-gold-luxury/10 rounded-full blur-[60px] bottom-0 left-1/2 mix-blend-screen"></div>
    </div>

    <div class="rsvp-glass relative w-full max-w-lg z-10">
      
      <div class="absolute -inset-[1px] rounded-[32px] bg-gradient-to-b from-white/20 via-transparent to-white/5 opacity-50 pointer-events-none"></div>

      <div class="bg-black/40 backdrop-blur-2xl rounded-[30px] p-8 md:p-10 shadow-2xl border border-white/5 relative overflow-hidden">
        
        <div class="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/5 via-transparent to-transparent rotate-45 pointer-events-none"></div>

        <div class="text-center mb-10 relative">
          <h2 class="font-script text-4xl md:text-5xl text-gold-luxury drop-shadow-lg mb-2">R.S.V.P</h2>
          <p class="font-serif text-white/50 text-xs tracking-[0.2em] uppercase">Mohon Konfirmasi Kehadiran</p>
        </div>

        <form @submit.prevent="sendMessage" class="space-y-6 relative">
          
          <div>
            <label class="block text-[10px] text-white/60 uppercase tracking-widest mb-2 pl-2">Nama Lengkap</label>
            <input 
              v-model="form.name"
              type="text" 
              class="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-gold-luxury/50 focus:bg-black/50 transition-all shadow-inner"
              placeholder="Masukkan nama Anda..." 
            />
          </div>

          <div>
            <label class="block text-[10px] text-white/60 uppercase tracking-widest mb-3 pl-2">Konfirmasi</label>
            <div class="grid grid-cols-2 gap-4">
              
              <button 
                type="button"
                @click="triggerConfetti"
                class="relative group p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 overflow-hidden"
                :class="form.status === 'Hadir' 
                  ? 'bg-gold-luxury/20 border-gold-luxury shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10'"
              >
                <div class="confetti-icon text-2xl mb-1">🕊️</div>
                <span class="text-xs font-bold uppercase tracking-widest" :class="form.status === 'Hadir' ? 'text-gold-luxury' : 'text-white/40'">Hadir</span>
                <div v-if="form.status === 'Hadir'" class="absolute top-2 right-2 w-2 h-2 bg-gold-luxury rounded-full shadow-[0_0_5px_#D4AF37]"></div>
              </button>

              <button 
                type="button"
                @click="form.status = 'Berhalangan'"
                class="relative group p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2"
                :class="form.status === 'Berhalangan' 
                  ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10'"
              >
                <div class="text-2xl mb-1 grayscale group-hover:grayscale-0 transition">🙏</div>
                <span class="text-xs font-bold uppercase tracking-widest" :class="form.status === 'Berhalangan' ? 'text-red-400' : 'text-white/40'">Maaf</span>
              </button>

            </div>
          </div>

          <div v-if="form.status === 'Hadir'" class="animate-[fadeIn_0.5s_ease-out]">
            <label class="block text-[10px] text-white/60 uppercase tracking-widest mb-2 pl-2">Jumlah Tamu</label>
            <div class="flex items-center bg-black/30 border border-white/10 rounded-xl p-2 shadow-inner">
              <button type="button" @click="form.guests > 1 ? form.guests-- : null" class="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition text-xl font-light">-</button>
              <div class="flex-1 text-center font-serif text-xl text-gold-luxury">{{ form.guests }}</div>
              <button type="button" @click="form.guests < 5 ? form.guests++ : null" class="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition text-xl font-light">+</button>
            </div>
          </div>

          <div>
            <label class="block text-[10px] text-white/60 uppercase tracking-widest mb-2 pl-2">Ucapan & Doa</label>
            <textarea 
              v-model="form.message"
              rows="3"
              class="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-gold-luxury/50 focus:bg-black/50 transition-all shadow-inner resize-none"
              placeholder="Tulis ucapan manis Anda..."
            ></textarea>
          </div>

          <button 
            type="submit"
            :disabled="isSending"
            class="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] shadow-lg transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
            :class="isSending ? 'bg-charcoal text-white/50 border border-white/10' : 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-charcoal hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]'"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              <span v-if="isSending">Mengirim...</span>
              <span v-else>Kirim Konfirmasi</span>
              <svg v-if="!isSending" class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
            <div class="absolute inset-0 -translate-x-full group-hover:animate-[shine_1s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0"></div>
          </button>

        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.shadow-inner { box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.5); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes shine { 100% { transform: translateX(100%); } }
</style>

