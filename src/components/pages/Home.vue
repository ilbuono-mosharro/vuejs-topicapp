<script setup>
import VueImage from '../../assets/vue.svg'
import DjangoImage from '../../assets/django-logo-positive.svg'
import Topics from "../topics/Topics.vue";
</script>

<template>
  <div class="d-flex align-items-center justify-content-around flex-row p-3 my-3 text-white bg-purple rounded shadow-sm">
    <div class="lh-1">
      <img class="me-3" :src="DjangoImage" alt="" width="100" height="38">
      <h1 class="h6 mb-0 text-white lh-1">Rest Framework</h1>
    </div>
    <div class="lh-1">
      <img class="me-3" :src="VueImage" alt="" width="48" height="40">
      <h1 class="h6 mb-0 text-white lh-1">Vue js</h1>
      </div>
  </div>
  <Topics />
</template>

<style>

body {
  padding-top: 56px;
}
.bg-purple {
  background-color: #6f42c1;
}
</style>