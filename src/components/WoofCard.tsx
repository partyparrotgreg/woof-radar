import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { calculateDistanceInMeters, formatDistanceNumber } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { WoofLevelIcon } from "./WoofLevelIcon";
import { Card } from "./ui/card";

export const WoofCard = ({
  point,
  index,
}: {
  index: number;
  point: {
    id: number;
    level: number | null;
    lat: string | null;
    lng: string | null;
    isPublic: boolean | null;
    createdAt: Date;
    updatedAt: Date | null;
  };
}) => {
  const { location } = useCurrentLocation();
  const pointCoordinatesToNumber = {
    lat: Number(point.lat),
    lng: Number(point.lng),
  };
  const distance = calculateDistanceInMeters(
    location?.coords,
    pointCoordinatesToNumber,
  );
  return (
    <Card className="p-4">
      <div className="flex flex-row items-center gap-2">
        <div>
          <WoofLevelIcon level={point.level!} index={index} />
        </div>
        <div className="flex grow flex-col items-start">
          <div className="font-medium">Your location</div>
          <div className="text-sm opacity-60">Rua Dr Pita 26</div>
        </div>
        <div className="flex grow flex-col items-end">
          <div className="font-medium">{point.level}</div>
          <div className="text-sm opacity-60">
            {distance ? (
              formatDistanceNumber(distance)
            ) : (
              <Loader2 className="animate-spin" size={16} />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
