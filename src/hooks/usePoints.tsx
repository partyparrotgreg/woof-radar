import { calculateDistanceInMeters } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useMemo } from "react";
import { useCurrentLocation } from "./useCurrentLocation";

export const usePoints = () => {
  const { location } = useCurrentLocation();
  const allWoofs = api.woof.getAllWoofs.useQuery();
  const points = allWoofs.data;

  const pointsWithDistance = useMemo(
    () =>
      points?.map((point) => {
        return {
          ...point,
          distance: calculateDistanceInMeters(location?.coords, {
            lat: Number(point.lat),
            lng: Number(point.lng),
          }),
        };
      }),
    [location, points],
  );

  return { points, pointsWithDistance };
};
