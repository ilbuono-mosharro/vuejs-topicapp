import {defineStore} from 'pinia'


export const useAuthStore = defineStore('auth', {
    state: () => ({
        loading: true,
        error: null,
        token: localStorage.getItem('token') || null,
    }),
    actions: {
        async login(url, data) {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                if (response.ok) {
                    this.token = await response.json()
                    console.log(this.token + "token")
                    localStorage.setItem('token', this.token.token);
                } else {
                    console.log("credentail errors")
                }
            } catch (e) {
            } finally {
                this.loading = false
            }
        },
        async logOut(url, token) {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${this.token}`,
                },
            })
            if (response.ok) {
                localStorage.removeItem("token")
            }
        }
    },
    getters: {
        isAuthenticated: (state) => {
            return state.token !== null;
        },
        currentToken: (state) => state.token.value
    },
})