"use client";

import { ListPagination } from "@/components/ListPagination";
import { UserNav } from "@/components/auth/UserNav";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";

export default function Home() {
  const { location, error } = useCurrentLocation();

  return (
    <>
      <div className="relative flex grow flex-col gap-4 p-4">
        <div className="flex shrink justify-between gap-2 rounded-lg bg-background p-2">
          <div className="text-2xl">🐶📌</div>
          <div className="flex gap-2">
            <UserNav />
          </div>
        </div>
        <div>
          <p>
            {location ? (
              <span>
                Your current location is:{" "}
                <span className="font-bold">
                  {location.coords.latitude}, {location.coords.longitude}
                </span>
              </span>
            ) : (
              <span>Loading...</span>
            )}
          </p>
        </div>
        <div className="flex h-48 grow flex-col gap-2">
          {" "}
          <ScrollArea className="h-48 grow">
            <div className="flex flex-col gap-1">
              {Array.from({ length: 24 }).map((_, index) => (
                <Card className="p-4" key={index}>
                  <div>content</div>
                </Card>
              ))}
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
