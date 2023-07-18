<script setup>
const props = defineProps({
  class: String,
  closebutton: Function,
  text:String,
})
</script>

<template>
<div  role="alert" :class="props.class">
  {{ text }}
  <button type="button" class="btn-close" data-bs-dismiss="alert"  @click="props.closebutton" aria-label="Close"></button>
</div>
</template>