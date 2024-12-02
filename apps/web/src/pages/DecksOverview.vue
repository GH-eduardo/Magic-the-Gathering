<script setup lang="ts">
import router from "@/router";
import { useDecksStore } from "@/stores/decks/decks.store";
import { DeckOverview } from "@/stores/decks/dto/deck-overview.dto";
import { ref } from "vue";

const store = useDecksStore();
const decks = ref([] as DeckOverview[])
const fileInput = ref<HTMLInputElement | null>(null)

async function getDecksOverview() {
  decks.value = await store.getDecksOverviewAsync();
}

async function deleteDeck(id: string) {
  await store.deleteDeckAsync(id);
  decks.value = decks.value.filter(deck => deck.deckId != id);
}

function triggerFileUpload() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

async function importDeck(event: any) {
  if (event.target.files.length <= 0) return;

  const file = event.target.files[0]
  if (!file) return;

  const reader = new FileReader();
  reader.readAsText(event.target.files[0])
  reader.onload = async (event) => {
    const importDeckDto = JSON.parse(event.target?.result?.toString()!);
    await store.importDeckAsync(importDeckDto)
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  }
}


getDecksOverview()

</script>

<template>
  <div class="d-flex flex-column w-75 ga-6 flex-start">
    <div class="d-flex justify-end ga-3">
      <input type="file" ref="fileInput" accept=".json" style="display: none" @change="importDeck" />
      <v-btn @click="triggerFileUpload" prepend-icon="mdi-upload">Import deck</v-btn>
      <v-btn prepend-icon="mdi-cached">Generate deck</v-btn>
    </div>
    <div class="list-container">
      <v-list v-if="decks.length > 0">
        <div @click="router.push('/decks/' + item.deckId)"
          class="d-flex justify-space-between align-center pa-2 deck-item" v-for="item in decks" :key="item.deckId">
          <div class="d-flex align-center ga-5 px-1">
            <img :src="item.commanderImage" height="100" />
            <div class="d-flex flex-column align-start flex-start">
              <p>{{ item.name }}</p>
              <p style="opacity: var(--v-medium-emphasis-opacity)">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </v-list>
    </div>
  </div>
</template>

<style lang="css" scoped>
.deck-item:hover {
  cursor: pointer;
  background-color: rgba(90, 90, 90, 0.6);
}
</style>