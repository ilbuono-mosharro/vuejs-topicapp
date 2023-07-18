<script setup>
const props = defineProps({
  className: String,

})
</script>

<template>
  <div :class="props.className" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<style scoped>

</style>