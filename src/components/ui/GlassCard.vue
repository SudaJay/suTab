<script setup lang="ts">
defineProps<{
  padded?: boolean
}>()
</script>

<template>
  <section
    class="glass rounded-[22px] transition-[transform,box-shadow,background] duration-300 ease-apple"
    :class="padded === false ? '' : 'p-5 sm:p-6'"
  >
    <slot />
  </section>
</template>
