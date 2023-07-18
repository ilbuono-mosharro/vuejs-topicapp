import {defineStore} from 'pinia'
import axios from "axios";
const base_url = "http://127.0.0.1:8000/api"

export const useRegistrationStore = defineStore('accounts', {
    state: () => ({
        created:null,
        error: null,
        loading: false,
        success: null,
        data: null,
        usernameError: null,
        passwordError: null,
        emailError:null,
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
      //   async userProfile() {
      //   try {
      //       this.loading = true
      //     const response = await fetch(`${BaseUrl}/accounts/${token}/`, {
      //         method: "GET",
      //         headers: {
      //             Authorization: `Token ${token}`,
      //         },
      //     })
      //     if (response.ok) {
      //       this.data = await response.json()
      //     } else {
      //       console.log("error")
      //     }
      //   } catch (e) {
      //   } finally {
      //     this.loading = false
      //   }
      // },
      //   async deleteProfile() {
      //   try {
      //       this.loading = true
      //     const response = await fetch(`${BaseUrl}/accounts/${token}/`, {
      //         method: "DELETE" +
      //             "",
      //         headers: {
      //             Authorization: `Token ${token}`,
      //         },
      //     })
      //     if (response.ok) {
      //       this.data = await response.json()
      //     } else {
      //       console.log("error")
      //     }
      //   } catch (e) {
      //   } finally {
      //     this.loading = false
      //   }
      // },
    },
})