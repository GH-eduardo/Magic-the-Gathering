import { defineStore } from "pinia";
import { ref } from "vue";
import { AccessToken } from "./dto/access-token.dto";
import { UserData } from "./dto/user-data.dto";

export const useUsersStore = defineStore('user', () => {
    const user = ref({} as UserData)
    const accessToken = ref({} as AccessToken)

    async function login(email: string, password: string) {
        const response = await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()
        user.value.id = json.userId
        accessToken.value.token = json.accessToken
        accessToken.value.expiresIn = json.expiresIn
    }

    async function register(username: string, email: string, password: string) {
        const response = await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        })
    }

    async function getUserInformation() {
        console.log("USER - " + user.value.id)
        if (!user.value.name) {
            const response = await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/users/${user.value.id}`, { headers: {
                "Authorization": "Bearer " + accessToken.value.token
            }});
            const json = await response.json();
            user.value.name = json.name
            user.value.email = json.email
        }
    }

    async function getUserFirstName(): Promise<string> {
        await getUserInformation()
        const words = user.value.name.split(' ')
        return words[0]
    }

    function isAuthenticated() {
        if (!accessToken.value.token) return false;

        if (accessToken.value.expiresIn <= new Date()) return false;

        return true;
    }

    return { register, login, getUserInformation, getUserFirstName, isAuthenticated }
})