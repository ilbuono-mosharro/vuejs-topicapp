<script setup>
import {useRoute} from "vue-router";
import {useTopicsStore} from "../stores/topicsStore.js";
import {onMounted} from "vue";
const route = useRoute()
const topicStore = useTopicsStore()

onMounted(async () => {
   await topicStore.singleTopic(Number(route.params.id))
})

</script>

<template>
<div class="row">
  <div class="col-12">
    <h1>{{topicStore.topic}}</h1>
    <p></p>
  </div>
</div>
</template>

<style scoped>

</style>