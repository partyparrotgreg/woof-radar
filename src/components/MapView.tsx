"use client";

import { WoofLevelIcon } from "@/app/new/_components/WoofLevelIcon";
import { YourLocationIcon } from "@/app/new/_components/YourLocation";
import { env } from "@/env";
import { useDummyPoints } from "@/hooks/useDummyPoints";
import { cn, generateEntries, getCoords } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store-provider";

import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
  useApiIsLoaded,
  useMap,
} from "@vis.gl/react-google-maps";
import { Loader2, MapIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const MapView = () => {
  const map = useMap();
  const apiIsLoaded = useApiIsLoaded();
  const memoPoints = useDummyPoints();
  const { location } = useAppStore((state) => state);
  const [mapCenter, setMapCenter] = useState(getCoords(location));
  const [zoom, setZoom] = useState(18);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!map || !apiIsLoaded) setLoading(true);
    setLoading(false);
    setMapCenter(getCoords(location));
    setZoom(18);
    map?.setCenter(getCoords(location));
    map?.setZoom(18);
  }, [apiIsLoaded, location, map]);

  if (loading)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
        <Loader2 className="animate-spin" />
      </div>
    );
  return (
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
        defaultZoom={zoom}
        gestureHandling={"greedy"}
      >
        <AdvancedMarker position={getCoords(location)}>
          {location ? (
            <YourLocationIcon />
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </AdvancedMarker>
        {memoPoints.map((point, index) => (
          <AdvancedMarker
            key={point.id}
            position={{ lat: point.lat, lng: point.lng }}
          >
            <WoofLevelIcon level={point.level} index={index} />
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
};



