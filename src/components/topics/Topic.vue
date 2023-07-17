<script setup>
import {useRoute} from "vue-router";
import {useTopicsStore} from "../../stores/topicsStore.js";
import {onMounted} from "vue";
import VueImage from "../../assets/vue.svg";
import LikeImage from "../../assets/hand-thumbs-up.svg"
import DisLikeImage from "../../assets/hand-thumbs-down.svg"

const route = useRoute()
const topicStore = useTopicsStore()
const token = localStorage.getItem('token')

onMounted(async () => {
   await topicStore.singleTopic(Number(route.params.id))
})



const upVoteSubmit = async () => {
  await topicStore.upvoteTopic(Number(route.params.id), `Token ${token}`)
}
const downVoteSubmit = async () => {
  await topicStore.downvoteTopic(Number(route.params.id), `Token ${token}`)
}

</script>

<template>
<div class="row">
  <div class="col-12">
    <div class="card border-0">
      <div v-if="topicStore.loading" class="spinner-border text-primary wh-7" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
      <div v-else class="card-body">
        <h1>{{topicStore.topic?.subject}}</h1>
    <p>{{topicStore.topic?.category?.name}}</p>
    <div class="d-flex">
  <div class="flex-shrink-0">
    <img :src="topicStore.topic?.starter?.avatar ? topicStore.topic?.starter?.avatar : VueImage" alt="..." class="img-fluid rounded-3" width="50" height="50">
  </div>
  <div class="flex-grow-1 ms-3 text-start">
    @{{topicStore.topic?.starter?.first_name}} {{ topicStore.topic?.starter?.last_name }}
    <p>{{topicStore.topic?.body}}</p>
  </div>
</div>
        <div class="d-flex flex-row">
          <div class="p-2">
              <div>
                <form @submit.prevent="upVoteSubmit">
                <button class="btn btn-light align-middle">
                  {{ topicStore.upvote ? topicStore.upvote : topicStore.topic?.upvote_count  }} Likes <img :src="LikeImage" alt="" />
                </button>
              </form>
              </div>
          </div>
          <div class="p-2">
             <form @submit.prevent="downVoteSubmit">
                <button class="btn btn-light align-middle">
                  {{ topicStore.downvote ? topicStore.downvote : topicStore.topic?.downvote_count }} Dislikes <img :src="DisLikeImage" alt="" />
                </button>
              </form>
          </div>
          <div class="p-2 ms-auto">
            <div>
                {{ topicStore.topic?.created_data}}
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>