import {defineStore} from 'pinia'

const BaseUrl = "http://127.0.0.1:8000/api"

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loading: false,
        error: null,
        token: localStorage.getItem('token') || null,
    }),
    actions: {
        async login(data) {
            try {
                this.loading = true
                const response = await fetch(`${BaseUrl}/accounts/api-token-auth/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                if (response.ok) {
                    this.token = await response.json()
                    localStorage.setItem('token', this.token.token);
                } else {
                    this.error = true
                }
            } catch (e) {
                this.error = true
            } finally {
                this.loading = false
            }
        },
        async logOut() {
            try {
                const response = await fetch(`${BaseUrl}/accounts/logout/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `token ${this.token.token}`,
                    },
                })
                if (response.ok) {
                    localStorage.removeItem("token")
                } else {
                    this.error = "Something went wrong, try again later."
                }
            } catch (e) {

            }
        }
    },
    getters: {
        isAuthenticated: (state) => {
            return state.token.token !== null;
        },
    },
})