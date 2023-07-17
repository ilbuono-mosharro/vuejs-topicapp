<script setup>
import {ref, onMounted} from "vue";
import {useTopicsStore} from "../../stores/topicsStore.js";
import {useCategoryStore} from "../../stores/categoriesStore.js";
import VueLogo from "../../assets/vue.svg";
import {useRoute} from "vue-router";

const topicsStore = useTopicsStore()
const categoryStore = useCategoryStore()
const router= useRoute()

const subject = ref(null)
const category = ref("")
const body = ref(null)
const closeButton = ref(false)
const closeAlert = () => closeButton.value = false

onMounted( async () => {
  await topicsStore.singleTopic(Number(router.params.id))
  await categoryStore.fetchCategories()
  subject.value = topicsStore.topic.subject,
      category.value = topicsStore.topic.category,
      body.value = topicsStore.topic.body
    }
)
const handleupdateTopic = async () => {
  await topicsStore.updateTopic(Number(router.params.id), {
    subject: subject.value,
    category: category.value,
    body: body.value,
  })
  if (topicsStore.success) {
    closeButton.value = true
  }
}
</script>

<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-12 col-md-6 col-lg-5">
      <div v-if="topicsStore.success && closeButton" class="alert alert-warning alert-dismissible fade show"
           role="alert">
        You have successfully updated the topic.
        <button type="button" class="btn-close" data-bs-dismiss="alert" @click="closeAlert" aria-label="Close"></button>
      </div>
      <form @submit.prevent="handleupdateTopic">
        <div class="text-center">
          <img class="mb-4 " :src="VueLogo" alt="" width="72" height="57">
          <h1 class="h3 mb-3 fw-normal">Update the topic</h1>
        </div>
        <div class="form-floating mb-4">
          <input type="text" class="form-control" v-model="subject" placeholder="Subject" required>
          <label for="floatingInput">Subject</label>
          <!--          <p v-if="registrationStore.usernameError" class="text-danger">{{ registrationStore.usernameError }}</p>-->
        </div>
        <div class="form-floating mb-4">
          <select class="form-select" id="floatingSelect" v-model="category" aria-label="Floating label select example">
            <option disabled value="">Please select one</option>
            <option v-for="(category, index) in categoryStore.data" :key="index" :value="category.id">{{category.name}}</option>
          </select>
          <label for="floatingSelect">Choose the category</label>
        </div>
        <div class="form-floating mb-4">
          <input type="text" class="form-control" v-model="body" placeholder="Last Name" required>
          <label for="floatingInput">Description</label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit">
          <span v-if="topicsStore.submitLoading" class="spinner-border spinner-border-sm" role="status"
                aria-hidden="true"></span>
          <span class="visually-hidden">Loading...</span>
          Add
        </button>
        <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>