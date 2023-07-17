<script setup>
import {ref, onMounted} from "vue";
import {useTopicsStore} from "../../stores/topicsStore.js";
import {useCategoryStore} from "../../stores/categoriesStore.js";
import VueLogo from "../../assets/vue.svg";

const topicsStore = useTopicsStore()
const categoryStore = useCategoryStore()

const subject = ref(null)
const category = ref("")
const body = ref(null)
const closeButton = ref(null)
const closeAlert = () => closeButton.value = false
const handleaddTopic = async () => {
  await topicsStore.addTopic({
    subject: subject.value,
    category: category.value,
    body: body.value,
  })
  if (topicsStore.success) {
    subject.value = "",
        category.value = "",
        body.value = "",
        topicsStore.emailError = null,
        topicsStore.passwordError = null,
        topicsStore.usernameError = null,
        closeButton.value = true
  }
}
onMounted(
    async () => {
      await categoryStore.fetchCategories()
    }
)
</script>

<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-12 col-md-6 col-lg-5">
      <div v-if="topicsStore.success && closeButton" class="alert alert-warning alert-dismissible fade show"
           role="alert">
        You have successfully added a topic.
        <button type="button" class="btn-close" data-bs-dismiss="alert" @click="closeAlert" aria-label="Close"></button>
      </div>
      <form @submit.prevent="handleaddTopic">
        <div class="text-center">
          <img class="mb-4 " :src="VueLogo" alt="" width="72" height="57">
          <h1 class="h3 mb-3 fw-normal">Add a topic</h1>
        </div>
        <div class="form-floating mb-4">
          <input type="text" class="form-control" v-model="subject" placeholder="Username" required>
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