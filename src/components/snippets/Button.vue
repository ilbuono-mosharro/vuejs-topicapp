<script setup>
const props = defineProps({
  className:String,
  type:String,
  text:String,
  disabled:Boolean,
})
</script>

<template>
<button :class="props.className" :type="props.type" :disabled="props.disabled">
  {{ text }}
</button>
</template>

<style scoped>

</style>