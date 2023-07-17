<script setup>
import {useAuthStore} from "../../stores/authStore.js";
import { ref } from "vue";
import {useRouter} from "vue-router";

import VueLogo from '../../assets/vue.svg'
const authentication = useAuthStore()

const username = ref('');
const password = ref('');
const closeButton = ref()
const router = useRouter()
const closeAlert = () => closeButton.value = false

const LoginSubmit = async () => {
  await authentication.login({username:username.value, password:password.value})
  const auth = await authentication.token

  if (auth) {
    router.push("/")
  } else {
    closeButton.value = true
  }
}

</script>

<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-12 col-md-6 col-lg-5">
      <div v-if="authentication.error && closeButton" class="alert alert-warning alert-dismissible fade show" role="alert">
  Unable to log in with provided credentials.
  <button type="button" class="btn-close" data-bs-dismiss="alert" @click="closeAlert" aria-label="Close"></button>
</div>
<form @submit.prevent="LoginSubmit">
  <div class="text-center">
    <img class="mb-4 " :src="VueLogo" alt="" width="72" height="57">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
</div>
    <div class="form-floating mb-4">
      <input type="text" class="form-control" v-model="username" placeholder="Username" required>
      <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating mb-4">
      <input type="password" class="form-control" v-model="password" placeholder="Password" required>
      <label for="floatingPassword">Password</label>
    </div>

    <button class="btn btn-primary w-100 py-2" type="submit">
      <span v-if="authentication.loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
       <span class="visually-hidden">Loading...</span>
      Sign in</button>
    <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
  </form>
      </div>
  </div>
</template>

<style scoped>

</style>