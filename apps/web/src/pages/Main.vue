<template>
    <v-navigation-drawer>
        <div class="d-flex flex-column justify-center align-center my-10">
            <v-avatar icon="mdi-account"></v-avatar>
            <p v-if="!loading">Hello, {{ firstName }}!</p>
        </div>
        <v-list-item prepend-icon="mdi-home" title="Home" value="home" to="/home"></v-list-item>
        <v-list-item prepend-icon="mdi-folder" title="Decks" value="decks" to="/decks"></v-list-item>
        <v-list-item prepend-icon="mdi-file-upload" title="Imports" value="imports" to="/imports"></v-list-item>
        <v-list-item prepend-icon="mdi-logout" title="Logout" value="cards" class="mb-0" to="/auth/login"></v-list-item>
    </v-navigation-drawer>
    <v-main class="d-flex justify-center align-start ma-6">
        <router-view></router-view>
    </v-main>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/users/user.store';
import { ref } from 'vue';

const userStore = useUsersStore();
const firstName = ref('');
const loading = ref(true);

async function fetchUserFirstName() {
    firstName.value = await userStore.getUserFirstName();
    loading.value = false;
}

fetchUserFirstName();
</script>