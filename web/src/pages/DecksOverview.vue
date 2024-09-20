<script setup>
import { useDecksStore } from "@/stores/decks/decks.store";
const store = useDecksStore();
</script>

<template>
  <div class="d-flex flex-column w-75 ga-6 flex-start">
    <div class="d-flex justify-end ga-3">
      <v-btn prepend-icon="mdi-upload">Import deck</v-btn>
      <v-btn prepend-icon="mdi-cached">Generate deck</v-btn>
    </div>
    <div class="list-container">
      <v-list>
        <div
          class="d-flex justify-space-between align-center pa-2"
          v-for="item in store.decks"
          :key="item.id"
        >
          <div class="d-flex align-center ga-5 px-1">
            <img :src="item.commander.image_url" height="100" />
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
                <v-btn icon="mdi-eye" :to="'/decks/' + item.id" v-bind="props"></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="Edit" location="top">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-pencil" v-bind="props"></v-btn>
              </template>
            </v-tooltip>
            <v-tooltip text="Delete" location="top">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-delete" v-bind="props"></v-btn>
              </template>
            </v-tooltip>
          </div>
        </div>
      </v-list>
    </div>
  </div>
</template>
