<template>
  <v-app>
    <v-navigation-drawer>
      <div class="d-flex flex-column justify-center align-center my-10">
        <v-avatar icon="mdi-account"></v-avatar>
        <p>Hello, John!</p>
      </div>
      <v-list-item prepend-icon="mdi-home" title="Home" value="home" to="/"></v-list-item>
      <v-list-item prepend-icon="mdi-folder" title="Decks" value="decks" to="/decks"></v-list-item>
      <v-list-item prepend-icon="mdi-cards" title="Cards" value="cards" to="/cards"></v-list-item>
    </v-navigation-drawer>
    <v-main class="d-flex justify-center align-start ma-6">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
