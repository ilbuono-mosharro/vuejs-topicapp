<script setup>
import {ref, onMounted} from "vue";
import {useTopicsStore} from "../../stores/topicsStore.js";
import {useCategoryStore} from "../../stores/categoriesStore.js";
import VueLogo from "../../assets/vue.svg";
import Alert from "../snippets/Alert.vue";
import Button from "../snippets/Button.vue";
import Field from "../snippets/Field.vue";

const topicsStore = useTopicsStore()
const categoryStore = useCategoryStore()
const token = localStorage.getItem('token')

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
  }, `Token ${token}`)
  if (topicsStore.topicForm) {
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
      <Alert v-if="topicsStore.topicForm && closeButton" class="alert alert-success alert-dismissible fade show"
             :closebutton="closeAlert" text="You have successfully added a topic."/>

      <form @submit.prevent="handleaddTopic">
        <div class="text-center">
          <img class="mb-4 " :src="VueLogo" alt="" width="72" height="57">
          <h1 class="h3 mb-3 fw-normal">Add a topic</h1>
        </div>
        <Field v-model="subject" type="text" class-input="form-control" placeholder="Subject" label-text="Subject"
               required="required"/>
        <div class="form-floating mb-4">
          <select class="form-select" id="floatingSelect" v-model="category" aria-label="Floating label select example"
                  required>
            <option disabled value="">Please select one</option>
            <option v-for="(category, index) in categoryStore.data" :key="index" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <label for="floatingSelect">Choose the category</label>
        </div>
        <Field v-model="body" type="textarea" class-input="form-control" placeholder="Description"
               label-text="Description"
               required="required"/>
        <Button class-name="btn btn-primary w-100 py-2" type="submit"
                :text="topicsStore.submitLoading ? 'I am loading data' : 'Add'"
                :disabled="!!topicsStore.submitLoading"/>
        <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>