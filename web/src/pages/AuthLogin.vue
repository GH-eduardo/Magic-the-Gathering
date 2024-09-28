<script setup lang="ts">
import router from '@/router';
import { LoginDto } from '@/stores/users/dto/login.dto';
import { useUsersStore } from '@/stores/users/user.store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const showPassword = ref(false)
const user = ref({} as LoginDto)
const userStore = useUsersStore()
const alertMessage = ref(null as any);
const route = useRoute()

onMounted(() => {
    if (route.query.type && route.query.message) {
        alertMessage.value = {
            type: route.query.type?.toString() || '',
            message: route.query.message?.toString() || ''
        }
    }
});

async function login() {
    try {
        await userStore.login(user.value.email, user.value.password);
        router.push('/')
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <div class="d-flex flex-column w-66 pa-6 ga-5">
        <v-alert v-if="alertMessage" :type="alertMessage.type" closable @close="alertMessage = null">
            {{ alertMessage.message }}
        </v-alert>
        <v-form>
            <v-text-field v-model="user.email" label="Email"></v-text-field>
            <v-text-field v-model="user.password" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword" :type="showPassword ? 'text' : 'password'"
                label="Password"></v-text-field>
            <v-btn @click.prevent="login" class="w-100">Login</v-btn>
        </v-form>
        <RouterLink to="/auth/register">I don't have an account yet</RouterLink>
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