import {defineStore} from 'pinia'

export const useRegistrationStore = defineStore('accounts', {
    state: () => ({
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
            try {
                this.loading = true;
                const response = await fetch("http://127.0.0.1:8000/api/accounts/sign-up/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    this.data = await response.json();
                    this.success = true;
                } else if (response.status === 400) {
                    this.error = await response.json();
                    this.usernameError = this.error?.username?.join()
                    this.passwordError = this.error?.non_field_errors?.join()
                    this.emailError = this.error?.email?.join()
                } else {
                    throw new Error("An error occurred while registering");
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
    },
})