<script setup>
import Nav from "./snippets/Nav.vue";
</script>

<template>
  <Nav />
  <main class="container mt-5">
    <slot></slot>
  </main>
  <footer></footer>
</template>

<style scoped>

</style>