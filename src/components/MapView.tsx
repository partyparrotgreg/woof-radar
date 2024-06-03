"use client";

import { WoofLevelIcon } from "@/components/WoofLevelIcon";
import { YourLocationIcon } from "@/components/YourLocation";
import { env } from "@/env";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { usePoints } from "@/hooks/usePoints";
import { getCoords, isDev } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store-provider";

import {
  APIProvider,
  AdvancedMarker,
  Map,
  useApiIsLoaded,
  useMap,
  type MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const MapView = () => {
  const map = useMap();
  const apiIsLoaded = useApiIsLoaded();
  const { pointsWithDistance } = usePoints();
  const { location, level } = useAppStore((state) => state);
  const [mapCenter, setMapCenter] = useState(getCoords(location));
  const [mapZoom, setMapZoom] = useState(18);
  const [containerSize, setContainerSize] = useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = useState(18);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { location: currentLocation } = useCurrentLocation();

  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    isDev && console.info("containerSize", containerSize);
    setContainerSize([width, height]);
  }, [containerSize]);

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

  if (loading)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-purple-300">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div
      className="h-full w-full overflow-hidden rounded-2xl shadow-lg"
      ref={containerRef}
    >
      <APIProvider apiKey={`${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}>
        <Map
          mapId={env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          className="h-full w-full"
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
                  <WoofLevelIcon level={point.level ?? 0} index={index} />
                </AdvancedMarker>
              ))
            : null}
        </Map>
      </APIProvider>
    </div>
  );
};

