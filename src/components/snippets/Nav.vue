<script setup>
import {useAuthStore} from "../../stores/authStore.js";
import {useRouter} from "vue-router";
import {ref} from "vue";

const authStore = useAuthStore()
const router = useRouter()
const showMenu = ref(false)
const handleLogout = async () => {
  await authStore.logOut()
  localStorage.removeItem("token")
  authStore.token = null
  await router.push('/login')
}
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<template>
<nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/">Vue Topics</router-link>
    <button class="navbar-toggler p-0 border-0" :class="{ 'collapsed' : showMenu}" type="button" @click="toggleMenu" id="navbarSideCollapse" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse offcanvas-collapse collapse flex-row" :class="{'show': showMenu}" id="navbarsExampleDefault">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item ms-auto">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
      </ul>
      <div v-if="authStore.token">
        <router-link :to="`/profile/${authStore.token}`" class="btn btn-light me-3">Profile</router-link>
        <button class="btn btn-primary" @click="handleLogout">Log out</button>
      </div>
      <div v-else class="button d-flex justify-content-end">
      <router-link to="/sign-up" class="btn btn-primary me-3">Sign Up</router-link>
      <router-link to="/login" class="btn btn-success">Login</router-link>
        </div>
    </div>
  </div>
</nav>
</template>

<style scoped>

</style>