"use client";

import { Map } from "@vis.gl/react-google-maps";

export const MapView = () => {
  return (
    <Map
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        isolation: "isolate",
      }}
      defaultCenter={{ lat: 22.54992, lng: 0 }}
      defaultZoom={3}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    />
  );
};
