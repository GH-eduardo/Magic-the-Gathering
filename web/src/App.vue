<template>
  <v-app>
    <v-navigation-drawer>
      <v-list-item prepend-icon="mdi-folder" title="Decks" value="decks" to="/"></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <div class="d-flex justify-space-evenly">
        <v-btn>Generate randomly</v-btn>
        <v-btn>Mount new</v-btn>
        <v-btn>Mount new</v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
