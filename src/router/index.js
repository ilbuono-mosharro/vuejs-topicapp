import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../components/pages/Home.vue";
import Topic from "../components/topics/Topic.vue";
import Login from "../components/auth/Login.vue";
import SignUp from "../components/accounts/SignUp.vue";
import AddTopic from "../components/topics/AddTopic.vue";
import UpdateTopic from "../components/topics/UpdateTopic.vue";
import UserProfile from "../components/accounts/UserProfile.vue";
import {useAuthStore} from "../stores/authStore.js";

const routes = [
    {path: '/', component: Home, name: "home"},
    {path: '/topic/add', component: AddTopic, name: "addTopic", meta: { requiresAuth: true },},
    {path: '/topic/:id', component: Topic, name: "topicDetail"},
    {path: '/topic/update/:id', component: UpdateTopic, name: "topicUpdate", meta: { requiresAuth: true },},
    {path: '/login', component: Login, name: "login"},
    {path: '/sign-up', component: SignUp, name: "signup"},
    {path: '/profile/:id', component: UserProfile, name: "userProfile", meta: { requiresAuth: true },},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to) => {
    // ✅ This will work because the router starts its navigation after
    // the router is installed and pinia will be installed too
    const store = useAuthStore()

    if (to.meta.requiresAuth && !store.isAuthenticated) return '/login'
})

export default router