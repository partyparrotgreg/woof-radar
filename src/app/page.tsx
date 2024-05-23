"use client";

import { WoofCard } from "@/components/WoofCard";
import { WooFormV2 } from "@/components/auth/WooFormV2";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { calculateDistanceInMeters } from "@/lib/utils";
import { api } from "@/trpc/react";
import { HelpCircle, Loader2 } from "lucide-react";
import Link from "next/link";
export default function Home() {
  const allWoofs = api.woof.getAllWoofs.useQuery();
  const points = allWoofs.data;
  const { location } = useCurrentLocation();
  if (!points) return <div>Loading...</div>;
  const pointsWithDistance = points?.map((point) => {
    return {
      ...point,
      distance: calculateDistanceInMeters(location?.coords, {
        lat: Number(point.lat),
        lng: Number(point.lng),
      }),
    };
  });

  return (
    <>
      <div className="relative flex grow flex-col gap-4">
        <div className="flex shrink items-center justify-between gap-2 rounded-lg">
          <div className="text-2xl font-semibold tracking-tight">
            🐶 Woof Radar
          </div>
          <div className="flex gap-2">
            <Link href="/help">
              <Button size={"icon"} variant={"ghost"}>
                <HelpCircle size={16} />
              </Button>
            </Link>
          </div>
        </div>
        <WooFormV2 />

        <div className="flex h-48 grow flex-col gap-2">
          {points ? (
            <ScrollArea className="h-48 grow">
              <div className="flex flex-col gap-1">
                {pointsWithDistance.map((point, index) => (
                  <WoofCard key={point.id} point={point} index={index} />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex h-48 grow items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}
        </div>
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
