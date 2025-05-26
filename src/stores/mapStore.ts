import { defineStore } from 'pinia';
import { LatLng } from 'leaflet';

/**
 * Pinia store for managing map-related state and actions.
 * This includes the current map selection, heatmap data, player count, and heatmap radius.
 */
export const useMapStore = defineStore('mapStore', {
  state: () => ({
    /**
     * Array of Leaflet LatLng objects representing points on the heatmap.
     * Each point can optionally have an `alt` property for intensity.
     */
    heatLatLngs: [] as LatLng[],
    /**
     * Number of players, used to calculate heatmap point intensity.
     * Higher player count can result in lower intensity per point.
     */
    playerCount: 100,
    /**
     * Name of the currently selected map (e.g., 'erangel').
     * This is used to determine the map image and bounds.
     */
    selectedMap: 'erangel',
    /**
     * The boundaries of the current map, represented as [[minY, minX], [maxY, maxX]].
     * For L.CRS.Simple, these are pixel coordinates.
     */
    mapBounds: [[0, 0], [1000, 1000]] as [[number, number], [number, number]],
    /**
     * Radius of the heatmap points in pixels.
     * Controls how large the area of influence for each heatmap point is.
     */
    heatmapRadius: 25,
  }),
  getters: {
    /**
     * Computes the path to the low-resolution image for the currently selected map.
     */
    mapImage: (state) => `src/assets/maps/${state.selectedMap}/Low_Res.png`,
  },
  actions: {
    /**
     * Updates the currently selected map.
     * @param mapName - The name of the map to select.
     */
    setSelectedMap(mapName: string) {
      this.selectedMap = mapName;
    },
    /**
     * Adds a new point to the heatmap.
     * @param point - A Leaflet LatLng object representing the point to add.
     */
    addHeatPoint(point: LatLng) {
      this.heatLatLngs.push(point);
    },
    /**
     * Clears all points from the heatmap.
     */
    clearHeatPoints() {
      this.heatLatLngs = [];
    },
    /**
     * Sets the player count.
     * @param count - The new player count.
     */
    setPlayerCount(count: number) {
      this.playerCount = count;
    },
    /**
     * Sets the radius for the heatmap points.
     * @param radius - The new radius in pixels.
     */
    setHeatmapRadius(radius: number) {
      this.heatmapRadius = radius;
    },
  },
});
