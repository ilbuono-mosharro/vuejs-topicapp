import {defineStore} from 'pinia'
const base_url = "http://127.0.0.1:8000/api"
const token = localStorage.getItem('token') || null

console.log(token)

export const useTopicsStore = defineStore('topics', {
    state: () => (
        {
            data: null,
            topic:null,
            success: null,
            failed: null,
            error: null,
            loading: true,
            upvote:null,
            downvote:null,
            voteid:null,
            topicForm:null,
            submitLoading:null,
        }
    ),
    actions: {
        async fetchTopics() {
             try {
                const response = await fetch(`${base_url}/topics/`)
                if (response.ok) {
                    this.data = await response.json()
                    this.success = true
                    console.log(this.data)
                } else {
                    this.failed = true
                }
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
        async singleTopic(id) {
            try {
                const response = await fetch(`${base_url}/topics/${id}/`)
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
        async upvoteTopic(id, token) {
           try {
                const response = await fetch(`${base_url}/topics/${id}/user-upvote/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                    body: JSON.stringify({}),
                })
                if (response.ok) {
                    this.voteid = await response.json()
                    this.success = true
                     this.upvote = this.voteid.upvote_count
                    this.downvote = this.voteid.downvote_count
                } else {
                    this.failed = true
                }
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
        async downvoteTopic(id, token) {
           try {
                const response = await fetch(`${base_url}/topics/${id}/user-downvote/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                    body: JSON.stringify({}),
                })
                if (response.ok) {
                    this.voteid = await response.json()
                    this.success = true
                    this.downvote = this.voteid.downvote_count
                    this.upvote = this.voteid.upvote_count
                } else {
                    this.failed = true
                }
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
        async addTopic(payload) {
            try {
                this.submitLoading = true;
                const response = await fetch(`${base_url}/topics/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                         "Authorization": `Token ${token}`
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    this.topicForm = await response.json();
                    this.success = true;
                    console.log(this.topicForm)
                } else if (response.status === 400) {
                    this.error = await response.json();
                } else {
                    throw new Error("An error occurred while send the data");
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.submitLoading = false;
            }
        },
        async deleteTopic(id) {
            try {
                this.submitLoading = true;
                const response = await fetch(`${base_url}/topics/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                         "Authorization": `Token ${token}`
                    },
                    body: JSON.stringify(id),
                });

                if (response.ok) {
                    this.topicForm = await response.json();
                    this.success = true;
                    console.log(this.topicForm)
                } else if (response.status === 400) {
                    this.error = await response.json();
                } else {
                    throw new Error("An error occurred while delete the data");
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.submitLoading = false;
            }
        },
    },
    getters: {
        total: (state) => state.data ? state.data.length : 0,
    },
})



