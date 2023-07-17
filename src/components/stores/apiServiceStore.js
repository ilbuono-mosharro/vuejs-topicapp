import {defineStore} from "pinia";

const base_url = "http://127.0.0.1:8000/api/"

export const useApiStore = defineStore("api", {
    state: () => ({
        data:null,
        id:null,
        topic:null,
        success:null,
        failed:null,
        error:null,
        loading:true,
        upvote:null,
        downvote:null,
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
        async getSingle(url) {
            try {
                const response = await fetch(base_url + url)
                if (response.ok) {
                    this.topic = await response.json()
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
        async put(url, method, token, data) {
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
                    this.upvote = data.upvote_count
                    this.downvote = 0
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