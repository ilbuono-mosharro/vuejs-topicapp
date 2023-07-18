<script setup>
import {ref} from "vue";
import {useRegistrationStore} from "../../stores/accountsStore.js";
import VueLogo from "../../assets/vue.svg";
import Alert from "../snippets/Alert.vue";
import Field from "../snippets/Field.vue";
import Button from "../snippets/Button.vue";

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
  if (registrationStore.created) {
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
     <Alert v-if="registrationStore.created && closeButton" class="alert alert-warning alert-dismissible fade show"
             :closebutton="closeAlert" text="You have successfully registered, you can now log in."/>
      <form @submit.prevent="handlesignUp">
        <div class="text-center">
          <img class="mb-4 " :src="VueLogo" alt="" width="72" height="57">
          <h1 class="h3 mb-3 fw-normal">Sign Up</h1>
        </div>
        <Field v-model="username" type="text" class-input="form-control" placeholder="Username" label-text="Username"
               required="required"/>
        <p v-if="registrationStore.usernameError" class="text-danger">{{ registrationStore.usernameError }}</p>
        <Field v-model="firstName" type="text" class-input="form-control" placeholder="First Name" label-text="First Name"
               required="required"/>
        <Field v-model="lastName" type="text" class-input="form-control" placeholder="Last Name" label-text="Last Name"
               required="required"/>
        <Field v-model="email" type="text" class-input="form-control" placeholder="email" label-text="email"
               required="required"/>
        <p v-if="registrationStore.emailError" class="text-danger">{{ registrationStore.emailError }}</p>
        <Field v-model="password" type="password" class-input="form-control" placeholder="Password"
               label-text="Password" required="required"/>
        <Field v-model="password1" type="password" class-input="form-control" placeholder="Repeat Password"
               label-text="Repeat Password" required="required"/>
        <p v-if="registrationStore.passwordError" class="text-danger">{{ registrationStore.passwordError }}</p>
        <Button class-name="btn btn-primary w-100 py-2" type="submit"
                :text="registrationStore.loading ? 'I\'m checking your data' : 'Sign up'"
                :disabled="!!registrationStore.loading"/>
        <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>