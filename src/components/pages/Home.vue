<script setup>
import Base from "../Base.vue";
import {useTopicsStore} from "../stores/topicsStore.js";
import {onMounted} from "vue";
import VueImage from '../../assets/vue.svg'
import DjangoImage from '../../assets/django-logo-positive.svg'


const topicStore = useTopicsStore()

onMounted(async () => {
  await topicStore.fetchTopics()
})
</script>

<template>
<Base>
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
  <div class="my-3 p-3 bg-body rounded shadow-sm">
    <h6 class="border-bottom pb-2 mb-0">{{ topicStore.total }} Topics</h6>
   <div class="table-responsive">
     <table class="table table-borderless table-hover">
       <thead>
    <tr>
      <th scope="col">Topic</th>
      <th scope="col">Category</th>
      <th scope="col"></th>
      <th scope="col">Replies</th>
      <th scope="col">Likes</th>
      <th scope="col">Dislikes</th>
      <th scope="col">Published</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(topic, index) in topicStore.data" :key="index">
      <th scope="row" class="fw-normal">{{topic.subject}}</th>
      <th class="fw-normal">{{topic.category.name}}</th>
      <th><img :src="topic.starter.avatar ? topic.starter.avatar : VueImage" class="img-fluid rounded-5" width="35" height="25" alt="" /></th>
      <th class="fw-normal">2</th>
      <th class="fw-normal">{{ topic.upvote_count }}</th>
      <th class="fw-normal">{{ topic.downvote_count }}</th>
      <th class="fw-normal">{{ topic.created_data }}</th>
    </tr>
  </tbody>

     </table>
   </div>
  </div>
</Base>
</template>

<style>
html,
body {
  overflow-x: hidden; /* Prevent scroll on narrow devices */
}

body {
  padding-top: 56px;
}
.bg-purple {
  background-color: #6f42c1;
}
</style>