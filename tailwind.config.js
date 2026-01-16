/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Palet Warna Mewah
      colors: {
        'gold-luxury': {
          light: '#FDE68A',     // Emas muda (highlight)
          DEFAULT: '#D4AF37',   // Emas murni (Metallic Gold)
          dark: '#AA771C',      // Emas tua (shadow/border)
        },
        'charcoal': {
          DEFAULT: '#0A0A0A',   // Hitam pekat (bg utama)
          light: '#1A1A1A',     // Hitam abu (bg card)
          dark: '#050505',      // Hitam paling gelap
        },
        'cream-paper': '#F5EFE6', // Warna kertas vintage (text secondary)
      },

      // 2. Tipografi Editorial
      fontFamily: {
        serif: ['"Cinzel Decorative"', 'serif'], // Judul Utama (Display)
        script: ['"Pinyon Script"', 'cursive'],  // Nama Pengantin / Signature
        sans: ['"Montserrat"', 'sans-serif'],    // Teks Body / Informasi
      },

      // 3. Animasi Kustom
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'pulse-slow': 'pulse 8s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 1.5s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shine: {
          '0%': { left: '-100%' }, // Mulai dari luar kiri
          '100%': { left: '200%' }, // Berakhir di luar kanan
        },
        glow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
      },

      // 4. Efek Background & Texture
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'noise-pattern': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
      },

      // 5. Box Shadow & Glassmorphism
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'gold-glow': '0 0 30px -10px rgba(212, 175, 55, 0.4)',
      },
      
      // 6. Scale tambahan untuk tipografi dramatis
      fontSize: {
        '10xl': '10rem',
        '12xl': '12rem',
      },
    },
  },
  plugins: [],
}

