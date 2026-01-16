<script>
import { h } from 'vue'

// Divider Floral Horizontal
export const FloralDivider = (props) => h('svg', {
  ...props,
  viewBox: "0 0 100 15",
  fill: "none",
  stroke: "currentColor",
  class: "w-32 md:w-48 h-auto mx-auto text-rose-gold/50 my-8"
}, [
  h('path', { d: "M0 7.5C20 7.5 20 0 40 0C60 0 60 7.5 80 7.5C100 7.5 100 15 120 15" }),
  h('path', { d: "M0 7.5C20 7.5 20 15 40 15C60 15 60 7.5 80 7.5C100 7.5 100 0 120 0", opacity: 0.5 })
])

// Ornamen Sudut (Corner)
export const CornerFrame = (props) => h('svg', {
  ...props,
  viewBox: "0 0 50 50",
  fill: "none",
  stroke: "currentColor",
  class: `w-16 h-16 text-rose-gold/40 absolute ${props.positionClass}`
}, [
   h('path', { d: "M2 50V15C2 7.8203 7.8203 2 15 2H50" })
])
</script>

