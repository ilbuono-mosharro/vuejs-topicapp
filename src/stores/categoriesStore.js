import {defineStore} from 'pinia'
const base_url = "http://127.0.0.1:8000/api"

export const useCategoryStore = defineStore('category', {
    state: () => (
        {
            data: null,
            success: null,
            failed: null,
            error: null,
            loading: true,
        }
    ),
    actions: {
        async fetchCategories() {
             try {
                const response = await fetch(`${base_url}/categories/`)
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
    },
})



