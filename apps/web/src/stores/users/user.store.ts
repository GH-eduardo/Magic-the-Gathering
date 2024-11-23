import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { AccessToken } from "./dto/access-token.dto";
import { UserData } from "./dto/user-data.dto";

export const useUsersStore = defineStore('user', () => {
    const user = ref({} as UserData)
    const accessToken = ref({} as AccessToken)

    const savedToken = localStorage.getItem('accessToken');
    const savedExpiresIn = localStorage.getItem('expiresIn');
    const userId = localStorage.getItem('userId');
    if (savedToken && savedExpiresIn && userId) {
        accessToken.value.token = savedToken;
        accessToken.value.expiresIn = new Date(savedExpiresIn);
        user.value.id = userId;
    }

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

        localStorage.setItem('userId' ,json.userId);
        localStorage.setItem('accessToken', json.accessToken);
        localStorage.setItem('expiresIn', json.expiresIn);
    }

    async function register(username: string, email: string, password: string) {
        await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        })
    }

    function logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expiresIn');
        user.value = {} as UserData;
        accessToken.value = {} as AccessToken;
    }

    async function getUserInformation() {
        if (!user.value.name) {
            const response = await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/users/${user.value.id}`, {
                headers: {
                    "Authorization": "Bearer " + accessToken.value.token
                }
            });
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

    return { register, login, logout, getUserInformation, getUserFirstName, isAuthenticated, accessToken }
})