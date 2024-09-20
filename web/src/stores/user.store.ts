import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsersStore = defineStore('user', () => {
    const user = ref({})

    async function login(email: string, password: string) {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        user.value = await response.json()
    }

    async function register(email: string, name: string, password: string) {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
    }
})