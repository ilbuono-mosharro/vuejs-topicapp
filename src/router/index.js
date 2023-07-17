import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/pages/Home.vue";
import Topic from "../components/topics/Topic.vue";
import Login from "../components/auth/Login.vue";

const routes = [
  { path: '/', component: Home, name:"home" },
  { path: '/topic/:id', component: Topic, name: "topicDetail" },
  { path: '/login', component: Login, name:"login" },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router