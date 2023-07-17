<script setup>
import {useRegistrationStore} from "../../stores/accountsStore.js";
import {onMounted, ref} from "vue";
import VueLogo from '../../assets/vue.svg'
import {useRouter} from "vue-router";

const username = ref()
const firstName = ref()
const lastName = ref()
const email = ref()
const avatar =ref()

const route = useRouter()
const profile = useRegistrationStore()

onMounted(async () => {
  await profile.userProfile()
  username.value = profile.data.username,
      firstName.value = profile.data.first_name,
      lastName.value = profile.data.last_name,
      email.value = profile.data.email,
      avatar.value = profile.data.avatar
})

const handleDelete = async () => {
  // await profile.deleteProfile()
  // localStorage.removeItem("token")
  // route.push('/')
  console.log("test")
}


</script>

<template>
<div class="row justify-content-center align-items-center">
  <div class="col-6">
      <div class="card border-0">
  <div class="card-body">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <img :src="profile.data?.avatar ? profile.data?.avatar : VueLogo" class="card-img-top" alt="..." width="200" height="300">
      </li>
  <li class="list-group-item">Username: {{profile.data?.username}}</li>
  <li class="list-group-item">First Name: {{profile.data?.first_name}}</li>
  <li class="list-group-item">Last Name: {{profile.data?.last_name}}</li>
  <li class="list-group-item">Email: {{profile.data?.email}}</li>
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