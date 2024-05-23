"use client";

import { WoofLevelIcon } from "@/components/WoofLevelIcon";
import { YourLocationIcon } from "@/components/YourLocation";
import { env } from "@/env";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { calculateDistanceInMeters, getCoords } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store-provider";
import { api } from "@/trpc/react";

import {
  APIProvider,
  AdvancedMarker,
  Map,
  type MapCameraChangedEvent,
  useApiIsLoaded,
  useMap,
} from "@vis.gl/react-google-maps";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const MapView = () => {
  const map = useMap();
  const apiIsLoaded = useApiIsLoaded();
  const { location, level } = useAppStore((state) => state);
  const [mapCenter, setMapCenter] = useState(getCoords(location));
  const [mapZoom, setMapZoom] = useState(18);
  const [containerSize, setContainerSize] = useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = useState(18);
  const [loading, setLoading] = useState(true);
  const allWoofs = api.woof.getAllWoofs.useQuery();
  const points = allWoofs.data;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { location: currentLocation } = useCurrentLocation();
  const pointsWithDistance = points?.map((point) => {
    return {
      ...point,
      distance: calculateDistanceInMeters(currentLocation?.coords, {
        lat: Number(point.lat),
        lng: Number(point.lng),
      }),
    };
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    setContainerSize([width, height]);
  }, []);

  useEffect(() => {
    if (!map || !apiIsLoaded) setLoading(true);
    setLoading(false);
    setMapCenter(getCoords(location));
    setZoom(18);
    map?.setCenter(getCoords(location));
    map?.setZoom(18);
  }, [apiIsLoaded, location, map]);

  const handleZoomChange = (zoom: MapCameraChangedEvent) => {
    setMapZoom(zoom.detail.zoom);
  };

  const getZoomFactor = (mapZoom: number, initialZoom = 18, maxZoom = 22) => {
    if (mapZoom < initialZoom) mapZoom = initialZoom;
    if (mapZoom > maxZoom) mapZoom = maxZoom;
    return (mapZoom - initialZoom) / (maxZoom - initialZoom);
  };

  function calculateCircleRadius(level: number, zoom: number) {
    const baseRadius = 100; // Base radius in meters at zoom level 18
    const zoomFactor = (zoom - 18) / (22 - 18); // Normalize zoom level to a factor between 0 and 1
    const levelAdjustedRadius = baseRadius * (level / 100); // Adjust radius based on level (10 to 99)
    const zoomAdjustedRadius = levelAdjustedRadius * (1 + zoomFactor); // Adjust radius based on zoom factor

    return zoomAdjustedRadius;
  }

  if (loading)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="h-full w-full overflow-hidden" ref={containerRef}>
      <APIProvider apiKey={`${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}>
        <Map
          mapId={env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          className="h-full w-full overflow-hidden rounded-2xl outline"
          defaultCenter={mapCenter}
          center={mapCenter}
          onCenterChanged={(center) =>
            setMapCenter({
              lat: center.detail.center.lat,
              lng: center.detail.center.lng,
            })
          }
          onZoomChanged={(zoom) => handleZoomChange(zoom)}
          defaultZoom={zoom}
          gestureHandling={"greedy"}
        >
          <AdvancedMarker position={getCoords(location)}>
            {currentLocation ? (
              <div className="relative isolate flex items-center justify-center ">
                <div className="absolute z-50 ">
                  <YourLocationIcon />
                </div>
              </div>
            ) : (
              <Loader2 className="animate-spin" />
            )}
          </AdvancedMarker>
          {pointsWithDistance
            ? pointsWithDistance.map((point, index) => (
                <AdvancedMarker
                  key={point.id}
                  position={{ lat: Number(point.lat), lng: Number(point.lng) }}
                >
                  <WoofLevelIcon level={point.level!} index={index} />
                </AdvancedMarker>
              ))
            : null}
        </Map>
      </APIProvider>
    </div>
  );
};

