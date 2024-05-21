"use client";

import { env } from "@/env";
import { useAppStore } from "@/stores/app-store-provider";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

export const MapView = () => {
  const { location } = useAppStore((state) => state);
  console.log("map view", location);
  if (!location)
    return (
      <div className="h-full w-full overflow-hidden rounded-2xl outline">
        Loading...
      </div>
    );
  return (
    <APIProvider apiKey={`${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}>
      <Map
        className="h-full w-full overflow-hidden rounded-2xl outline"
        defaultCenter={
          {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          } ?? { lat: 22.54992, lng: 0 }
        }
        onCenterChanged={(center) => {
          console.log("center changed", center); // TODO tutaj chyba dragowac mozna
        }}
        center={{
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        }}
        defaultZoom={6}
        zoom={18}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
};
