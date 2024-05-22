import { generateEntries } from "@/lib/utils";
import { useMemo } from "react";
import { useCurrentLocation } from "./useCurrentLocation";

export const useDummyPoints = () => {
  const { location } = useCurrentLocation();
  const points = useMemo(() => {
    return generateEntries(
      location,
      50,
    );
  }, [location]);
  return points;
}
