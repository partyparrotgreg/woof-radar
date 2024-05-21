import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useAppStore } from "@/stores/app-store-provider";
import { useCallback, useEffect, useState } from "react";

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationPosition | null>(null);
  const { setLocation } = useAppStore((state) => state);
  const [error, setError] = useState<string | null>(null);

  // const updateStoreLocation
  const handleRefreshLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation(position);
        setLocation(position);
        toast({
          description: "Updated location",
          duration: 2500,
        });
      },
      () => {
        setError("Unable to retrieve your location");
        toast({
          description: "Unable to retrieve your location",
          action: (
            <ToastAction altText="Refresh" onClick={handleRefreshLocation}>
              Refresh
            </ToastAction>
          ),
        });
      },
    );
  }, [setLocation]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      toast({
        title: "Scheduled: Catch up ",
        description: "Friday, February 10, 2023 at 5:57 PM",
        action: (
          <ToastAction
            altText="Goto schedule to undo"
            onClick={handleRefreshLocation}
          >
            Refresh
          </ToastAction>
        ),
      });
    } else {
      handleRefreshLocation();
    }
  }, [handleRefreshLocation, setCurrentLocation]);

  return { location: currentLocation, error };
};
