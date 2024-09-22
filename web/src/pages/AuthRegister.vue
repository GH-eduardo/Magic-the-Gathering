<script setup lang="ts">
import router from '@/router';
import { RegisterDto } from '@/stores/users/dto/register.dto';
import { useUsersStore } from '@/stores/users/user.store';
import { ref } from 'vue';

const showPassword = ref(false)
const userStore = useUsersStore()
const user = ref({} as RegisterDto)

async function register() {
    try {
        await userStore.register(user.value.username, user.value.email, user.value.password);
        router.push({ path: '/auth/login', query: { type: 'success', message: 'User registered successfully!'} })
    } catch (error) {
        console.error(error)
    }
}

</script>

<template>
    <div class="d-flex flex-column w-66 pa-6 ga-5">
        <v-form>
            <v-text-field v-model="user.username" label="Name"></v-text-field>
            <v-text-field v-model="user.email" label="Email"></v-text-field>
            <v-text-field v-model="user.password" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword" :type="showPassword ? 'text' : 'password'"
                label="Password"></v-text-field>
            <v-btn @click.prevent="register" class="w-100">Register</v-btn>
        </v-form>
        <RouterLink to="/auth/login">Back to login</RouterLink>
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
    text-align: center;
    color: rgb(255, 255, 255);
}

a:hover {
    color: rgba(255, 255, 255, 0.8);
}
</style>
