import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/pages/Home.vue";
import Topic from "../components/topics/Topic.vue";
import Login from "../components/auth/Login.vue";
import SignUp from "../components/accounts/SignUp.vue";
const routes = [
  { path: '/', component: Home, name:"home" },
  { path: '/topic/:id', component: Topic, name: "topicDetail" },
  { path: '/login', component: Login, name:"login" },
  { path: '/sign-up', component: SignUp, name:"signup" },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router