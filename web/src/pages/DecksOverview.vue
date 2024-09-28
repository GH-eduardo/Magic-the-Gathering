<script setup lang="ts">
import { useDecksStore } from "@/stores/decks/decks.store";
import { DeckOverview } from "@/stores/decks/dto/deck-overview.dto";
import { ref } from "vue";
const store = useDecksStore();
const decks = ref([] as DeckOverview[])

async function getDecksOverview() {
  decks.value = await store.getDecksOverview();
}

async function deleteDeck(id: string) {
  await store.deleteDeck(id);
  decks.value = decks.value.filter(deck => deck.deckId != id);
}

getDecksOverview()

</script>

<template>
  <div class="d-flex flex-column w-75 ga-6 flex-start">
    <div class="d-flex justify-end ga-3">
      <v-btn prepend-icon="mdi-upload">Import deck</v-btn>
      <v-btn prepend-icon="mdi-cached">Generate deck</v-btn>
    </div>
    <div class="list-container">
      <v-list v-if="decks.length > 0">
        <div
          class="d-flex justify-space-between align-center pa-2"
          v-for="item in decks"
          :key="item.deckId"
        >
          <div class="d-flex align-center ga-5 px-1">
            <img :src="item.commanderImage" height="100" />
            <div class="d-flex flex-column align-start flex-start">
              <p>{{ item.name }}</p>
              <p style="opacity: var(--v-medium-emphasis-opacity)">
                {{ item.description }}
              </p>
            </div>
          </div>
          <div class="d-flex ga-1">
            <v-tooltip text="Export" location="top">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-download" v-bind="props"></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="View details" location="top">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-eye" :to="'/decks/' + item.deckId" v-bind="props"></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="Edit" location="top">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-pencil" v-bind="props"></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="Delete" location="top">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-delete" @click="deleteDeck(item.deckId)" v-bind="props"></v-btn>
              </template>
            </v-tooltip>
          </div>
        </div>
      </v-list>
    </div>
  </div>
</template>
