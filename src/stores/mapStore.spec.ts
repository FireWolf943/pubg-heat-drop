import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useMapStore } from './mapStore';
import { LatLng } from 'leaflet';

describe('mapStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with correct default values', () => {
    const store = useMapStore();
    expect(store.playerCount).toBe(100);
    expect(store.selectedMap).toBe('erangel');
    expect(store.heatmapRadius).toBe(25);
    expect(store.mapBounds).toEqual([[0, 0], [1000, 1000]]);
    expect(store.heatLatLngs).toEqual([]);
  });

  it('setSelectedMap action updates selectedMap and mapImage getter', () => {
    const store = useMapStore();
    store.setSelectedMap('miramar');
    expect(store.selectedMap).toBe('miramar');
    expect(store.mapImage).toBe('src/assets/maps/miramar/Low_Res.png');
  });

  it('setPlayerCount action updates playerCount', () => {
    const store = useMapStore();
    store.setPlayerCount(50);
    expect(store.playerCount).toBe(50);
  });

  it('setHeatmapRadius action updates heatmapRadius', () => {
    const store = useMapStore();
    store.setHeatmapRadius(50);
    expect(store.heatmapRadius).toBe(50);
  });

  it('addHeatPoint and clearHeatPoints actions work correctly', () => {
    const store = useMapStore();
    const mockLatLng = new LatLng(10, 20);

    store.addHeatPoint(mockLatLng);
    expect(store.heatLatLngs).toContain(mockLatLng);
    expect(store.heatLatLngs.length).toBe(1);

    store.clearHeatPoints();
    expect(store.heatLatLngs).toEqual([]);
    expect(store.heatLatLngs.length).toBe(0);
  });
});
