import {defineStore} from 'pinia'
import axios from 'axios'

const BaseUrl = "http://127.0.0.1:8000/api"
const token = localStorage.getItem('token') || null

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loading: false,
        error: null,
        token: token,
    }),
    actions: {
        async login(payload) {
            try {
                this.loading = true
                const response = await axios.post(`${BaseUrl}/accounts/api-token-auth/`, payload)
                this.token = response.data
                localStorage.setItem('token', this.token.token);
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
        async logOut() {
            try {
                const response = await axios.post(`${BaseUrl}/accounts/logout/`)
                this.token = response.data
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
    },
    getters: {
        isAuthenticated: (state) => {
            return state?.token !== null;
        },
    },
})