<script setup>
const props = defineProps({
  'class': String,
  'closebutton': Function,
})
</script>

<template>
<div  role="alert" :class="props.class">
  Unable to log in with provided credentials.
  <button type="button" class="btn-close" data-bs-dismiss="alert"  @click="props.closebutton" aria-label="Close"></button>
</div>
</template>