import {defineStore} from 'pinia'
import axios from "axios";
const base_url = "http://127.0.0.1:8000/api"

export const useCategoryStore = defineStore('category', {
    state: () => (
        {
            data: null,
            error: null,
            loading: true,
        }
    ),
    actions: {
        async fetchCategories() {
            this.loading = true
            try {
                const response = await axios.get(`${base_url}/categories/`)
                this.data = response.data
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
    },
})



