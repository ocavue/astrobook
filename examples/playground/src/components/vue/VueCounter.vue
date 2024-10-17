<template>
  <div class="counter">
    <button @click="subtract">-</button>
    <pre>{{ count }}</pre>
    <button @click="add">+</button>
  </div>
  <div class="counter-message">
    <slot />
  </div>
</template>

<script lang="ts">
import '../../styles/global.css'

import { ref, defineComponent } from 'vue'

/** A counter written with Vue */
export default defineComponent({
  props: {
    step: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const count = ref(0)
    const add = () => (count.value += props.step)
    const subtract = () => (count.value -= props.step)

    return {
      count,
      add,
      subtract,
    }
  },
})
</script>
