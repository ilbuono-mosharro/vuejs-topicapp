<script setup>
import {useRegistrationStore} from "../../stores/accountsStore.js";
import {onMounted} from "vue";
import VueLogo from '../../assets/vue.svg'
import {useRouter} from "vue-router";
import {useAuthStore} from "../../stores/authStore.js";
const token = localStorage.getItem('token')
const route = useRouter()
const user = useRegistrationStore()
const auth = useAuthStore()

onMounted(async () => {
  await user.userProfile(`Token ${token}`)
})

const handleDelete = async () => {
  await user.deleteProfile(`Token ${token}`)
  localStorage.removeItem("token")
  auth.token = null
  await route.push('/deleted')
}


</script>

<template>
<div class="row justify-content-center align-items-center">
  <div class="col-6">
      <div class="card border-0">
  <div class="card-body">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <img :src="user.profile?.avatar ? user.profile?.avatar : VueLogo" class="card-img-top" alt="..." width="200" height="300">
      </li>
  <li class="list-group-item">Username: {{user.profile?.username}}</li>
  <li class="list-group-item">First Name: {{user.profile?.first_name}}</li>
  <li class="list-group-item">Last Name: {{user.profile?.last_name}}</li>
  <li class="list-group-item">Email: {{user.profile?.email}}</li>
      <li class="list-group-item">
        <button class="btn btn-danger" @click="handleDelete">Delete your account</button>
      </li>
</ul>
  </div>
</div>
  </div>

</div>
</template>

<style scoped>

</style>