import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useMapStore } from '@/stores/mapStore';
import LobbySettings from './LobbySettings.vue';

// Import Vuetify essentials
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Create a Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
});

describe('LobbySettings.vue', () => {
  let pinia;

  beforeEach(() => {
    // Create a new Pinia instance and set it as active for each test
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('updates playerCount in the store when Player Count field is changed', async () => {
    const wrapper = mount(LobbySettings, {
      global: {
        plugins: [vuetify, pinia], // Use the new Pinia instance
      },
    });
    const store = useMapStore(); // Get store instance after Pinia is active

    // Find the Player Count VTextField, then its input element
    // Vuetify 3 structure: v-text-field -> input
    const playerCountInput = wrapper.findAll('input[type="number"]')[0];
    await playerCountInput.setValue('50');

    expect(store.playerCount).toBe(50);
  });

  it('updates heatmapRadius in the store when Heatmap Radius field is changed', async () => {
    const wrapper = mount(LobbySettings, {
      global: {
        plugins: [vuetify, pinia], // Use the new Pinia instance
      },
    });
    const store = useMapStore(); // Get store instance

    // Find the Heatmap Radius VTextField, then its input element
    // This assumes it's the second input[type="number"] on the page
    const heatmapRadiusInput = wrapper.findAll('input[type="number"]')[1];
    await heatmapRadiusInput.setValue('75');

    expect(store.heatmapRadius).toBe(75);
  });
});
