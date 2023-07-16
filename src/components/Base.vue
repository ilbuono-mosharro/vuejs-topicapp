<script setup>
import Nav from "./snippets/Nav.vue";
</script>

<template>
  <Nav />
  <main class="container">
    <slot></slot>
  </main>
  <footer></footer>
</template>

<style scoped>

</style>