import { createStore } from "zustand/vanilla";

type LocationType = {
  lng: number;
  lat: number;
};

export type AppState = {
  level: number;
  location: GeolocationPosition;
  selectedMarker: LocationType;
};

export type AppActions = {
  decrementLevel: () => void;
  incrementLevel: () => void;
  setLocation: (location: GeolocationPosition) => void;
};

export const initAppStore = (): AppState => ({
  level: 0,
  location: {
    coords: {
      latitude: 0,
      longitude: 0,
      altitude: null,
      accuracy: 0,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: 0,
  },
  selectedMarker: {
    lat: 0,
    lng: 0,
  },
});

export type AppStore = AppState & AppActions;

export const defaultInitState: AppState = {
  level: 0,
  location: {
    coords: {
      latitude: 0,
      longitude: 0,
      altitude: null,
      accuracy: 0,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: 0,
  },
  selectedMarker: {
    lat: 0,
    lng: 0,
  },
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()((set) => ({
    ...initState,
    decrementLevel: () => set((state) => ({ level: state.level - 1 })),
    incrementLevel: () => set((state) => ({ level: state.level + 1 })),
    setLocation: (location) => set({ location }),
  }));
};
