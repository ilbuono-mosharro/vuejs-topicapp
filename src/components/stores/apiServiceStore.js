import {defineStore} from "pinia";

const base_url = "http://127.0.0.1:8000/api/"

export const useApiStore = defineStore("api", {
    state: () => ({
        data:null,
        success:null,
        failed:null,
        error:null,
        loading:true,
    }),
    actions: {
        async get(url) {
            try {
                const response = await fetch(base_url + url)
                if (response.ok) {
                    this.data = await response.json()
                    this.success = true
                } else {
                    this.failed = true
                }
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
        async postOrputOrdelete(url, method, token, data) {
            try {
                const response = await fetch(base_url + url, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                    body: JSON.stringify(data),
                })
                if (response.ok) {
                    this.data = await response.json()
                    this.success = true
                } else {
                    this.failed = true
                }
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        }
    },
    getters: {

    },
})