<!--
  PubgMap.vue
  This component displays a map with a heatmap layer. Users can click on the map to add points
  to the heatmap. The map image, heatmap data, and heatmap radius are controlled by the Pinia store.
-->
<script setup lang="ts">
import * as L from 'leaflet'
import { nextTick, onMounted, ref, watch } from 'vue'
import 'leaflet.heat'
import 'leaflet/dist/leaflet.css'
import { useMapStore } from '@/stores/mapStore' // Import the store

const store = useMapStore() // Use the store

const leafletMap = ref<L.Map>()
const heat = ref<L.HeatLayer>()
const imageOverlay = ref<L.ImageOverlay>() // Store the image overlay instance

const initMap = () => {
  // Get mapBounds from store
  const bounds: L.LatLngBoundsLiteral = store.mapBounds
  leafletMap.value = L.map('pubgmap', {
    crs: L.CRS.Simple,
    minZoom: 0,
    maxZoom: 2,
    attributionControl: false,
    zoomControl: false,
    maxBoundsViscosity: 0.9,
    maxBounds: bounds,
    doubleClickZoom: false
  })
  // Use mapImage getter from store and store the overlay
  imageOverlay.value = L.imageOverlay(store.mapImage, bounds).addTo(leafletMap.value)
  leafletMap.value.fitBounds(bounds)

  // Clear heat points in store for the new map
  store.clearHeatPoints()

  heat.value = L.heatLayer(store.heatLatLngs, { // Use heatLatLngs from store
    radius: store.heatmapRadius // Use heatmapRadius from store
  }).addTo(leafletMap.value)

  leafletMap.value.on('click', (e: L.LeafletMouseEvent) => {
    const point = new L.LatLng(e.latlng.lat, e.latlng.lng)
    point.alt = 25 / store.playerCount // Use playerCount from store
    store.addHeatPoint(point) // Add point to store
    heat.value?.setLatLngs(store.heatLatLngs) // Update heat layer
  })
}

onMounted(() => {
  nextTick(() => {
    initMap()
  })
})

watch(
  () => store.selectedMap, // Watch selectedMap from store
  () => {
    if (leafletMap.value && imageOverlay.value) {
      // Update existing map
      imageOverlay.value.setUrl(store.mapImage);
      leafletMap.value.fitBounds(store.mapBounds); // Adjust view
      store.clearHeatPoints(); // Clear points for the new map
      heat.value?.setLatLngs(store.heatLatLngs); // Update heat layer with (now empty) points
    } else {
      // First-time setup or if map/overlay somehow don't exist
      leafletMap.value?.remove(); // Clean up if only one exists
      heat.value?.remove();
      initMap();
    }
    // This ensures the heat layer (which might have been re-created or just cleared)
    // reflects the current (empty) state of heatLatLngs for the new map.
    // If initMap() was called, it already sets up the heat layer with current store.heatLatLngs.
    // If only setUrl was called, this line is also important.
    heat.value?.setLatLngs(store.heatLatLngs);
  }
)

watch(
  () => store.heatmapRadius, // Watch heatmapRadius from store
  (newRadius) => {
    heat.value?.setOptions({ radius: newRadius });
  }
)
</script>

<template>
  <div id="pubgmap" class="mapContainer"></div>
</template>

<style scoped lang="scss">
.mapContainer {
  height: 100%;
  overflow: hidden;
  background-color: black;
}
</style>
