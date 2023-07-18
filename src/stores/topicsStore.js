import {defineStore} from 'pinia'
import axios from "axios";

const base_url = "http://127.0.0.1:8000/api"


export const useTopicsStore = defineStore('topics', {
    state: () => (
        {
            data: null,
            loading: false,
            error: null,
            topic: null,
            tloading: null,
            terrors: null,
            topicvote: null,
            voteerrors: null,
            upvote: null,
            downvote: null,
            topicForm: null,
            deletetopic: null,
            submitLoading: null,
            updatetopic: null
        }
    ),
    actions: {
        async fetchTopics() {
            this.loading = true
            try {
                const response = await axios.get(`${base_url}/topics/`)
                this.data = response.data
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
        async singleTopic(id) {
            this.tloading = true
            try {
                const response = await axios.get(`${base_url}/topics/${id}/`)
                this.topic = response.data
            } catch (e) {
                this.terrors = e.message
            } finally {
                this.tloading = false
            }
        },
        async upvoteTopic(id, token) {
            try {
                const response = await axios.post(`${base_url}/topics/${id}/user-upvote/`, {}, {
                    headers: {
                        "Authorization": token,
                    },
                })
                this.topicvote = response.data
                this.upvote = this.topicvote.upvote_count
                this.downvote = this.topicvote.downvote_count
            } catch (e) {
                this.voteerrors = e.message
            }
        },
        async downvoteTopic(id, token) {
            try {
                const response = await axios.post(`${base_url}/topics/${id}/user-downvote/`, {}, {
                    headers: {
                        "Authorization": token,
                    },
                })
                this.topicvote = response.data
                this.downvote = this.topicvote.downvote_count
                this.upvote = this.topicvote.upvote_count
            } catch (e) {
                this.voteerrors = e.message
            }
        },
        async addTopic(payload, token) {
            this.submitLoading = true;
            try {
                const response = await axios.post(`${base_url}/topics/`, payload, {
                    headers: {
                        "Authorization": token,
                    },
                })
                this.topicForm = response.data
            } catch (e) {
                this.error = e.message
            } finally {
                this.submitLoading = false;
            }
        },
        async deleteTopic(id, token) {
            try {
                const response = await axios.delete(`${base_url}/topics/${id}/`, {
                    headers: {
                        "Authorization": token,
                    },
                })
                this.deletetopic = response.data
            } catch (e) {
                this.error = e.message
            }
        },
        async updateTopic(id, payload, token) {
            this.submitLoading = true;
            try {
                const response = await axios.put(`${base_url}/topics/${id}/`, payload, {
                    headers: {
                        "Authorization": token,
                    },
                })
                this.updatetopic = response.data
            } catch (e) {
                this.error = e.message
            } finally {
                this.submitLoading = false;
            }
        },
    },
    getters: {
        total: (state) => state.data ? state.data.length : 0,
        mytopic: (state) => {
            return state.data.filter((topic, user) => topic?.starter?.username === user)
        }
    },
})



