<script setup>
const props = defineProps({
  type:String,
  placeholder:String,
  required:Boolean,
  classInput:String,
  labelText:String,
  modelValue:String,
})
defineEmits(['update:modelValue'])
</script>

<template>
<div class="form-floating mb-4">
  <input :type="props.type" :class="props.classInput" :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="props.placeholder" :required="props.required">
  <label for="floatingInput">{{ labelText }}</label>
</div>
</template>