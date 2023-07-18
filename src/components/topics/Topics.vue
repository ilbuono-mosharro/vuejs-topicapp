<script setup>
import {useTopicsStore} from "../../stores/topicsStore.js";
import {onMounted} from "vue";
import VueImage from '../../assets/vue.svg'
import Loader from "../snippets/Loader.vue";
import {useRegistrationStore} from "../../stores/accountsStore.js";
const token = localStorage.getItem('token')

const topicStore = useTopicsStore()
const user = useRegistrationStore()



onMounted(async () => {
  await topicStore.fetchTopics()
  if (token) {
    await user.userProfile(`Token ${token}`)
  }
})

const deleteTopic = async (id) => {
  await topicStore.deleteTopic(id, `Token ${token}`)
  await topicStore.fetchTopics()
}


const showMyTopic = () => {
  if (token) {
    topicStore.data = topicStore.data.filter(topic => user?.profile?.username === topic?.starter?.username)
    return topicStore.data
  }
}
const showAll = async () => {
  if (token) {
    await topicStore.fetchTopics()
  }
}
</script>

<template>
  <div class="my-3 p-3 bg-body rounded shadow-sm">
    <div v-if="topicStore.loading" class="d-flex justify-content-center align-items-center">
      <Loader class-name="spinner-border text-primary wh-7"/>
    </div>
    <div v-else class="table-responsive">
      <div class="d-flex flex-row justify-content-between align-items-center mb-4">
        <div class="p-2">
          <h5 class="border-bottom pb-2 mb-0 text-center">{{ topicStore.total }} Topics</h5>
        </div>
        <div class="p-2">
          <button v-if="token" class="btn btn-link me-4" @click="showMyTopic">My topics</button>
          <button v-if="token" class="btn btn-link" @click="showAll">Show All</button>
        </div>
        <div class="p-2">
          <router-link to="/topic/add" class="btn btn-success">Add Topic</router-link>
        </div>
      </div>
      <table class="table table-borderless table-hover">
        <thead>
        <tr>
          <th scope="col">Topic</th>
          <th scope="col">Category</th>
          <th scope="col"></th>
          <th scope="col">Likes</th>
          <th scope="col">Dislikes</th>
          <th scope="col">Published</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(topic, index) in topicStore.data" :key="index">
          <th scope="row" class="fw-normal">
            <router-link :to="`/topic/${topic.id}`" class="text-dark text-decoration-none">
              {{ topic.subject }}
            </router-link>
          </th>
          <th class="fw-normal">{{ topic.category_name }}</th>
          <th>
            <img :src="topic?.starter?.avatar ? topic?.starter?.avatar : VueImage" class="img-fluid rounded-5" width="35"
                   height="25" alt=""/>
          </th>
          <th class="fw-normal">{{ topic.upvote_count }}</th>
          <th class="fw-normal">{{ topic.downvote_count }}</th>
          <th class="fw-normal">{{ topic.created_data }}</th>
          <th>
            <form v-if="token ? user?.profile?.username === topic?.starter?.username : false" @submit="deleteTopic(topic.id)">
              <button class="btn btn-danger btn-sm">Delete</button>
            </form>
          </th>
          <th v-if="token ? user?.profile?.username === topic?.starter?.username : false">
            <router-link :to="`/topic/update/${topic.id}`" class="btn btn-warning btn-sm">Update</router-link>
          </th>
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