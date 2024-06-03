import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useCallback, useEffect, useState } from "react";

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRefreshLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation(position);
        toast({
          variant: "info",
          description: "Updated location",
          duration: 2500,
        });
      },
      () => {
        setError("Unable to retrieve your location");
        toast({
          variant: "destructive",
          description: "Unable to retrieve your location",
          action: (
            <ToastAction altText="Refresh" onClick={handleRefreshLocation}>
              Refresh
            </ToastAction>
          ),
        });
      },
    );
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      toast({
        variant: "destructive",
        description: "Geolocation is not supported by your browser",
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
