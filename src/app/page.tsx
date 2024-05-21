"use client";

import { ListPagination } from "@/components/ListPagination";
import { UserNav } from "@/components/auth/UserNav";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useDummyPoints } from "@/hooks/useDummyPoints";
import { Loader2 } from "lucide-react";
import { WoofLevelIcon } from "./new/_components/WoofLevelIcon";
import { calculateDistanceInMeters } from "@/lib/utils";

type Point = {
  id: string;
  level: number;
  lat: number;
  lng: number;
};

type PointWithDistance = Point & {
  distance: number;
};

export default function Home() {
  const { location } = useCurrentLocation();
  const memoPoints = useDummyPoints();

  const remapPointsWithDistanceAndFilterByDistance = () => {
    if (!location) return memoPoints as PointWithDistance[];

    return memoPoints
      .map((point) => ({
        ...point,
        distance: calculateDistanceInMeters(location.coords, point),
      }))
      .sort((a, b) => {
        if (a.distance < b.distance) return -1;
        if (a.distance > b.distance) return 1;
        return 0;
      });
  };
  return (
    <>
      <div className="relative flex grow flex-col gap-4 p-4">
        <div className="flex shrink justify-between gap-2 rounded-lg bg-background p-2">
          <div className="text-2xl">🐶📌</div>
          <div className="flex gap-2">
            <UserNav />
          </div>
        </div>

        <div className="flex h-48 grow flex-col gap-2">
          {" "}
          <ScrollArea className="h-48 grow">
            <div className="flex flex-col gap-1">
              {remapPointsWithDistanceAndFilterByDistance().map(
                (point, index) => (
                  <Card className="p-4" key={index}>
                    <div className="flex flex-row items-center gap-2">
                      <div>
                        <WoofLevelIcon level={point.level} index={index} />{" "}
                      </div>
                      <div className="grow">Doggo</div>
                      {point.distance ? (
                        <div className="text-xs text-gray-500">
                          {point.distance} away
                        </div>
                      ) : (
                        <Loader2 className="animate-spin" />
                      )}
                    </div>
                  </Card>
                ),
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div>
        <ListPagination />
      </div>
    </>
  );
}



// async function CrudShowcase() {
//   const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
