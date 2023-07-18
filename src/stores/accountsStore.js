import {defineStore} from 'pinia'
import axios from "axios";

const base_url = "http://127.0.0.1:8000/api"


export const useRegistrationStore = defineStore('accounts', {
    state: () => ({
        created: null,
        error: null,
        loading: false,
        profile: null,
        success: null,
        data: null,
        usernameError: null,
        passwordError: null,
        emailError: null,
    }),
    actions: {
        async signUp(payload) {
            this.loading = true;
            try {
                const response = await axios.post(`${base_url}/accounts/sign-up/`, payload)
                this.created = response.data
            } catch (error) {
                this.error = error.response.data
                this.usernameError = this.error?.username?.join()
                this.passwordError = this.error?.non_field_errors?.join()
                this.emailError = this.error?.email?.join()
            } finally {
                this.loading = false;
            }
        },
        async userProfile(token) {
            this.loading = true
            try {
                const response = await axios.get(`${base_url}/accounts/profile/`,
                    {
                        headers: {
                            "Authorization": token,
                        },
                    })
                this.profile = response.data
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
        async deleteProfile(token) {
            this.loading = true
            try {
                const response = await axios.delete(`${base_url}/accounts/profile/`,
                    {
                        headers: {
                            "Authorization": token,
                        },
                    })
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
    },
})