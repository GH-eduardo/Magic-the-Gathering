<script setup lang="ts">
import { ref } from 'vue';

const showPassword = ref(false)
</script>

<template>
    <div class="d-flex flex-column w-66 pa-6 ga-5">
        <v-form>
            <v-text-field label="Name"></v-text-field>
            <v-text-field label="Email"></v-text-field>
            <v-text-field :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword" :type="showPassword ? 'text' : 'password'"
                label="Password"></v-text-field>
            <v-btn class="w-100">Register</v-btn>
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
