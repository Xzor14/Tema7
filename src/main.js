import { createApp } from 'vue'
import App from './App.vue'

// Tailwind CSS
import './style.css'

// Magic UI (Luxury Effects)
import MagicUI from '@yousefkadah/vue-magic-ui'
import '@yousefkadah/vue-magic-ui/dist/style.css'

// AOS (Scroll Animation)
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

// Plugins
app.use(MagicUI)

// Mount
app.mount('#app')

// Init AOS
AOS.init({
  duration: 1200,
  once: true,
  easing: 'ease-out-cubic'
})
