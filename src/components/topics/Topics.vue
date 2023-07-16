<script setup>
import {useTopicsStore} from "../stores/topicsStore.js";
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import VueImage from '../../assets/vue.svg'

const router = useRouter()
const topicStore = useTopicsStore()

onMounted(async () => {
  await topicStore.fetchTopics()
})

const topicDetail = (id) => {
  router.push({name:"topicdetail", params:{id}})
}
</script>

<template>
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

<style scoped>

</style>