<script setup lang="ts">
interface Props {
  label?: string
}

defineProps<Props>()
</script>

<template>
  <div class="decorator" :data-label="label">
    <slot />
  </div>
</template>
