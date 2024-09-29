<script setup lang="ts">
import router from '@/router';
import { useDecksStore } from '@/stores/decks/decks.store';
import { DeckDetails } from '@/stores/decks/dto/deck-details.dto';
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(false)
const decksStore = useDecksStore()
const error = ref(null)
const deckDetails = ref({} as DeckDetails | null)
const editAction = ref(false)

watch(() => route.params.id, fetchDeck, { immediate: true })

async function fetchDeck(id: string | string[]) {
    if (typeof id === 'string') {
        error.value = deckDetails.value = null
        loading.value = true

        try {
            deckDetails.value = await decksStore.getDeckDetailsAsync(id);
        } catch (err: any) {
            error.value = err.toString()
        } finally {
            loading.value = false
        }
    }
}

async function exportDeck() {
    const response = await decksStore.exportDeckAsync(deckDetails.value?.id!);
    const blob = new Blob([JSON.stringify(response)], { type: "application/json" })
    const tempUrl = URL.createObjectURL(blob);
    const anchorElement = document.createElement('a');
    anchorElement.href = tempUrl;
    anchorElement.download = response.name + ".json";
    anchorElement.click();
    URL.revokeObjectURL(tempUrl);
}

async function deleteDeck() {
    await decksStore.deleteDeckAsync(deckDetails.value?.id!)
    router.push('/decks')
}

async function editDeck() {
    await decksStore.editDeckAsync(deckDetails.value?.id!, {
        name: deckDetails.value?.name!,
        description: deckDetails.value?.description!
    });
    editAction.value = false;
}

function updateDescription(value: string) {
    if(deckDetails.value) {
        deckDetails.value.description = value;
    }
}

function updateName(value: string) {
    if (deckDetails.value) {
        deckDetails.value.name = value;
    }
}

</script>

<template>
    <div class="d-flex flex-column w-75 ga-4">
        <div class="d-flex justify-end ga-3">
            <v-btn @click="exportDeck" prepend-icon="mdi-download">Export</v-btn>
            <v-btn @click="editAction = true" prepend-icon="mdi-pencil">Edit</v-btn>
            <v-btn @click="deleteDeck" prepend-icon="mdi-delete">Delete</v-btn>
        </div>
        <v-sheet class="d-flex pa-4 ga-4" rounded>
            <div class="d-flex flex-column ga-2">
                <img :src="deckDetails?.commander.imageUri" height="400" />
                <p style="text-align: center;">{{ deckDetails?.commander.name }}</p>
            </div>
            <v-form :readonly="!editAction" class="w-100">
                <v-text-field label="Name" dense variant="solo-filled" @update:model-value="updateName" :model-value="deckDetails?.name"></v-text-field>
                <v-textarea label="Description" variant="solo-filled"
                    :model-value="deckDetails?.description" @update:model-value="updateDescription"></v-textarea>
                <div class="d-flex ga-4">
                    <v-text-field readonly label="Created at" variant="solo-filled"
                        :model-value="deckDetails?.createdAt"></v-text-field>
                    <v-text-field readonly label="Edited at" variant="solo-filled"
                        :model-value="deckDetails?.editedAt"></v-text-field>
                </div>
                <div v-if="editAction" class="d-flex justify-end ga-4">
                    <v-btn @click="editAction = false">Cancel</v-btn>
                    <v-btn @click="editDeck">Save</v-btn>
                </div>
            </v-form>
        </v-sheet>
        <div class="d-flex ga-4 flex-wrap">
            <v-sheet v-for="card in deckDetails?.cards" :key="card.id" rounded
                class="card-container d-flex flex-column">
                <img :src="card.imageUri" height="400" />
                <p style="text-align: center;">{{ card.name }}</p>
            </v-sheet>
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