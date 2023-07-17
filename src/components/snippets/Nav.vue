<script setup>
import {useAuthStore} from "../../stores/authStore.js";
import {useRouter} from "vue-router";
import router from "../../router/index.js";
const authStore = useAuthStore()
const handleLogout = async () => {
  await authStore.logOut()
  authStore.token = null
  router.push('/login')
}
</script>

<template>
<nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/">Vue Topics</router-link>
    <button class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Notifications</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Switch account</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Settings</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
      <button v-if="authStore.token" class="btn btn-primary me-3" @click="handleLogout">Log out</button>
      <div v-else class="button">
      <router-link to="/sign-up" class="btn btn-primary me-3">Sign Up</router-link>
      <router-link to="/login" class="btn btn-success">Login</router-link>
        </div>
    </div>
  </div>
</nav>
</template>

<style scoped>

</style>