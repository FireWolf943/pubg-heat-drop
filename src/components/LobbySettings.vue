<!--
  LobbySettings.vue
  This component provides UI controls for adjusting lobby-specific settings,
  such as player count and heatmap radius. These settings are synchronized
  with the Pinia store.
-->
<script setup lang="ts">
import { useMapStore } from '@/stores/mapStore'; // Import the store
import { computed } from 'vue';

const store = useMapStore(); // Use the store

// Computed property for two-way binding with the store's playerCount state.
// This allows the v-text-field to directly read and write to the store's playerCount.
const playerCount = computed({
  get: () => store.playerCount, // Getter returns the current playerCount from the store.
  set: (value) => {
    // Setter parses the input value to an integer and updates the store.
    const parsedValue = parseInt(value as any, 10); // `value` can be string from input
    if (!isNaN(parsedValue)) {
      store.setPlayerCount(parsedValue);
    }
  },
});

// Computed property for two-way binding with the store's heatmapRadius state.
// This connects the v-text-field for heatmap radius to the Pinia store.
const heatmapRadius = computed({
  get: () => store.heatmapRadius, // Getter returns the current heatmapRadius from the store.
  set: (value) => {
    // Setter parses the input value and updates the store's heatmapRadius.
    const parsedValue = parseInt(value as any, 10); // `value` can be string from input
    if (!isNaN(parsedValue)) {
      store.setHeatmapRadius(parsedValue);
    }
  },
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Lobby Settings</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Player Count"
          type="number"
          v-model="playerCount"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Heatmap Radius"
          type="number"
          v-model="heatmapRadius"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>
