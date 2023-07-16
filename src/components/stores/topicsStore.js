import {defineStore} from 'pinia'
import {useApiStore} from "./apiServiceStore.js";

export const useTopicsStore = defineStore('topics', {
    state: () => (
        {
            data: null,
            topic:null,
            success: null,
            failed: null,
            error: null,
            loading: true,
        }
    ),
    actions: {
        async fetchTopics() {
            try {
                const api = useApiStore()
                await api.get("topics/")
                this.data = api.data
                this.success = api.success
                this.failed = api.failed
                this.error = api.error
                this.loading = api.loading
                console.log(this.data)
            } catch (e) {
                console.log(e)
            }
        },
        async singleTopic(id) {
            try {
                const api = useApiStore()
                await api.getSingle(`topics/${id}`)
                this.topic = api.topic
                this.success = api.success
                this.failed = api.failed
                this.error = api.error
                this.loading = api.loading
            } catch (e) {
                console.log(e)
            }
        }
    },
    getters: {
        total: (state) => state.data ? state.data.length : 0,
    },
})



