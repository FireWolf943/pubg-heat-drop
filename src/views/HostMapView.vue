<script setup lang="ts">
import PubgMap from '../components/PubgMap.vue'
import MapSelection from '../components/MapSelection.vue'
import LobbySettings from '../components/LobbySettings.vue'
// Remove ref as it's no longer needed
// import { ref } from 'vue'

// currentMap ref is no longer needed as PubgMap will get selectedMap from the store
// const currentMap = ref<string>('erangel')

// selectedMap function is no longer needed as MapSelection will call the store action
// const selectedMap = (map: string) => {
//   currentMap.value = map
// }
</script>

<template>
  <v-container id="main" fluid class="fill-height">
    <v-row style="height: 100%">
      <v-col cols="12" lg="3">
        <LobbySettings />
      </v-col>
      <v-col cols="12" lg="6" class="d-flex flex-column">
        <!-- Remove selectedMap prop -->
        <PubgMap class="map" />
      </v-col>
      <v-col cols="12" lg="3">
        <!-- Remove map-selected event listener -->
        <MapSelection />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.map {
  border: 5px solid black;
}
</style>
