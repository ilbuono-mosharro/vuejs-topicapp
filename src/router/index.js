import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/pages/Home.vue";

const routes = [
  { path: '/', component: Home, name:"home" },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router