<script setup>
import {useAuthStore} from "../../stores/authStore.js";
import {ref} from "vue";
import {useRouter} from "vue-router";
import VueLogo from '../../assets/vue.svg'
import Alert from "../snippets/Alert.vue";
import Field from "../snippets/Field.vue";
import Button from "../snippets/Button.vue";

const authentication = useAuthStore()

const username = ref();
const password = ref();
const closeButton = ref()
const router = useRouter()
const closeAlert = () => closeButton.value = false

const LoginSubmit = async () => {
  await authentication.login({username: username.value, password: password.value})
  const auth = authentication.token
  console.log(authentication.loading)

  if (auth) {
    await router.push("/")
  } else {
    closeButton.value = true
  }
}

</script>

<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-12 col-md-6 col-lg-5">
      <Alert v-if="authentication.error && closeButton" class="alert alert-warning alert-dismissible fade show"
             :closebutton="closeAlert"/>
      <form @submit.prevent="LoginSubmit">
        <div class="text-center">
          <img class="mb-4 " :src="VueLogo" alt="" width="72" height="57">
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        </div>
        <Field v-model="username" type="text" class-input="form-control" placeholder="Username" label-text="Username"
               required="required"/>
        <Field v-model="password" type="password" class-input="form-control" placeholder="Password"
               label-text="Password" required="required"/>
        <Button class-name="btn btn-primary w-100 py-2" type="submit"
                :text="authentication.loading ? 'I\'m checking your credentials' : 'Sign In'"
                :disabled="!!authentication.loading"/>
        <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>