import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsersStore = defineStore('user', () => {
    const user = ref({})

    async function login(email: string, password: string) {
        const response = await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        user.value = await response.json()
    }

    async function register(email: string, name: string, password: string) {
        const response = await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
    }

    return { register, login }
})