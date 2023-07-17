<script setup>
import {ref} from "vue";
import {useRegistrationStore} from "../../stores/accountsStore.js";
import VueLogo from "../../assets/vue.svg";

const registrationStore = useRegistrationStore()

const username = ref(null)
const firstName = ref(null)
const lastName = ref(null)
const email = ref(null)
const password = ref(null)
const password1 = ref(null)
const closeButton = ref()

const closeAlert = () => closeButton.value = false
const handlesignUp = async () => {
  await registrationStore.signUp({
    username: username.value,
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    password: password.value,
    password1: password1.value,
  })
  if (registrationStore.success) {
    username.value = "", firstName.value = "",
        lastName.value = "", email.value = "",
        password.value = "", password1.value = "",
        registrationStore.emailError = null,
        registrationStore.passwordError = null,
        registrationStore.usernameError = null,
        closeButton.value = true
  }
}
</script>

<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-12 col-md-6 col-lg-5">
      <div v-if="registrationStore.success && closeButton" class="alert alert-warning alert-dismissible fade show"
           role="alert">
        You have successfully registered, you can now log in at the following link.
        <router-link to="/login" class="btn btn-link">Login</router-link>
        <button type="button" class="btn-close" data-bs-dismiss="alert" @click="closeAlert" aria-label="Close"></button>
      </div>
      <form @submit.prevent="handlesignUp">
        <div class="text-center">
          <img class="mb-4 " :src="VueLogo" alt="" width="72" height="57">
          <h1 class="h3 mb-3 fw-normal">Sign Up</h1>
        </div>
        <div class="form-floating mb-4">
          <input type="text" class="form-control" v-model="username" placeholder="Username" required>
          <label for="floatingInput">Username</label>
          <p v-if="registrationStore.usernameError" class="text-danger">{{ registrationStore.usernameError }}</p>
        </div>
        <div class="form-floating mb-4">
          <input type="text" class="form-control" v-model="firstName" placeholder="First Name" required>
          <label for="floatingInput">First Name</label>
        </div>
        <div class="form-floating mb-4">
          <input type="text" class="form-control" v-model="lastName" placeholder="Last Name" required>
          <label for="floatingInput">Last Name</label>
        </div>
        <div class="form-floating mb-4">
          <input type="email" class="form-control" v-model="email" placeholder="Email" required>
          <label for="floatingInput">Email</label>
          <p v-if="registrationStore.emailError" class="text-danger">{{ registrationStore.emailError }}</p>
        </div>
        <div class="form-floating mb-4">
          <input type="password" class="form-control" v-model="password" placeholder="Password" required>
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating mb-4">
          <input type="password" class="form-control" v-model="password1" placeholder="Repeat Password" required>
          <label for="floatingPassword">Repeat Password</label>
          <p v-if="registrationStore.passwordError" class="text-danger">{{ registrationStore.passwordError }}</p>
        </div>

        <button class="btn btn-primary w-100 py-2" type="submit">
          <span v-if="registrationStore.loading" class="spinner-border spinner-border-sm" role="status"
                aria-hidden="true"></span>
          <span class="visually-hidden">Loading...</span>
          Sign up
        </button>
        <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>