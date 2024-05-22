import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateEntries(
  location: Partial<GeolocationPosition> | null,
  numEntries = 50,
) {
  const entries = [];

  const initialCoords = {
    latitude: 32.6395634,
    longitude: -97.133383,
  };

  const { latitude: baseLat, longitude: baseLng } = location?.coords ?? {
    latitude: 0,
    longitude: 0,
  };

  for (let i = 0; i < numEntries; i++) {
    const lat = baseLat + (Math.random() - 0.5) * 0.01;
    const lng = baseLng + (Math.random() - 0.5) * 0.01;
    const entry = {
      id: `id_${i}`,
      level: Math.floor(Math.random() * 100), // Random level between 0 and 99
      lat,
      lng,
      distance: calculateDistanceInMeters(location?.coords ?? initialCoords, {
        lat,
        lng,
      }),
    };
    entries.push(entry);
  }

  return entries;
}

export function woofLevelBackground(level: number) {
  // green lowest, red highest
  if (level < 10) return "#4CAF50";
  if (level < 30) return "#8BC34A";
  if (level < 50) return "#FFC107";
  if (level < 70) return "#FF9800";
  if (level < 90) return "#FF5722";
  return "#FF5722";
}

export function woofLevel(level: number) {
  if (level < 10) return "🐶";
  if (level < 30) return "🐕";
  if (level < 50) return "🐩";
  if (level < 70) return "🐕‍🦺";
  if (level < 90) return "🦮";
  return "🐕‍🦺";
}

export function getCoords(pos: GeolocationPosition) {
  return {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude,
  };
}

export function calculateDistanceInMeters(
  currentLocation: Partial<GeolocationCoordinates>,
  pointLocation: { lat: number; lng: number },
) {
  if (!currentLocation) return "0m";
  const { latitude, longitude } = currentLocation;
  if (!latitude || !longitude) return "0m";
  const R = 6371e3; // metres
  const pointLat = pointLocation.lat;
  const pointLng = pointLocation.lng;

  const φ1 = (latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (pointLat * Math.PI) / 180;
  const Δφ = ((pointLat - latitude) * Math.PI) / 180;
  const Δλ = ((pointLng - longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d.toFixed(0) + "m";
}