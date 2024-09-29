<script setup lang="ts">
import { useDecksStore } from '@/stores/decks/decks.store';
import { DeckDetails } from '@/stores/decks/dto/deck-details.dto';
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();

const loading = ref(false)
const decksStore = useDecksStore()
const error = ref(null)
const deckDetails = ref({} as DeckDetails | null)

watch(() => route.params.id, fetchDeck, { immediate: true })

async function fetchDeck(id: string | string[]) {
    if (typeof id === 'string') {
        error.value = deckDetails.value = null
        loading.value = true

        try {
            deckDetails.value = await decksStore.getDeckDetails(id);
            console.log(deckDetails.value)
        } catch (err: any) {
            error.value = err.toString()
        } finally {
            loading.value = false
        }
    }
}
</script>

<template>
    <div class="d-flex flex-column w-75 ga-4">
        <div class="d-flex justify-end ga-3">
            <v-btn prepend-icon="mdi-download">Export</v-btn>
            <v-btn prepend-icon="mdi-pencil">Edit</v-btn>
            <v-btn prepend-icon="mdi-delete">Delete</v-btn>
        </div>
        <v-sheet class="d-flex pa-4 ga-4" rounded>
            <div class="d-flex flex-column ga-2">
                <img :src="deckDetails?.commander.imageUri" height="400" />
                <p style="text-align: center;">{{ deckDetails?.commander.name }}</p>
            </div>
            <v-form readonly class="w-100">
                <v-text-field label="Name" dense variant="solo-filled" :model-value="deckDetails?.name"></v-text-field>
                <v-textarea label="Description" variant="solo-filled"
                    :model-value="deckDetails?.description"></v-textarea>
                <div class="d-flex ga-4">
                    <v-text-field label="Created at" variant="solo-filled"
                        :model-value="deckDetails?.createdAt"></v-text-field>
                    <v-text-field label="Edited at" variant="solo-filled"
                        :model-value="deckDetails?.editedAt"></v-text-field>
                </div>
                <div class="d-flex justify-end ga-4">
                    <v-btn>Cancel</v-btn>
                    <v-btn>Save</v-btn>
                </div>
            </v-form>
        </v-sheet>
        <div class="d-flex ga-4 flex-wrap">
            <RouterLink v-for="card in deckDetails?.cards" :key="card.id" :to="'/cards/' + card.id">
                <v-sheet rounded class="card-container d-flex flex-column">
                    <img :src="card.imageUri" height="400" />
                    <p style="text-align: center;">{{ card.name }}</p>
                </v-sheet>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
}

.card-container:hover {
    background-color: rgba(45, 45, 45, 1);
}
</style>