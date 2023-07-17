<script setup>
import {useTopicsStore} from "../../stores/topicsStore.js";
import {onMounted} from "vue";
import VueImage from '../../assets/vue.svg'

const topicStore = useTopicsStore()

onMounted( async () => {
  await topicStore.fetchTopics()
})

</script>

<template>
<div class="my-3 p-3 bg-body rounded shadow-sm">
  <div v-if="topicStore.loading" class="spinner-border text-primary wh-7" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
   <div v-else class="table-responsive">
     <h6 class="border-bottom pb-2 mb-0">{{ topicStore.total }} Topics</h6>
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
      <th scope="row" class="fw-normal">
        <router-link :to="`/topic/${topic.id}`">{{topic.subject}}</router-link>
      </th>
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
</template>

<style>
.wh-7 {
  width: 7rem;
  height: 7rem;
}

</style>