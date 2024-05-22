"use client";

import { ListPagination } from "@/components/ListPagination";
import { WooFormV2 } from "@/components/auth/WooFormV2";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDummyPoints } from "@/hooks/useDummyPoints";
import { woofLevelBackground } from "@/lib/utils";
import { HelpCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { WoofLevelIcon } from "./new/_components/WoofLevelIcon";

export default function Home() {
  const memoPoints = useDummyPoints();

  return (
    <>
      <div className="relative flex grow flex-col gap-4">
        <div className="flex shrink justify-between gap-2 rounded-lg bg-background">
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
          {" "}
          <ScrollArea className="h-48 grow">
            <div className="flex flex-col gap-1">
              {memoPoints.map((point, index) => (
                <Card className="p-4" key={index}>
                  <div className="flex flex-row items-center gap-2">
                    <div>
                      <WoofLevelIcon level={point.level} index={index} />{" "}
                    </div>
                    <div className="flex grow flex-col items-start">
                      <div className="font-medium">Your location</div>
                      <div className="text-sm opacity-60">Rua Dr Pita 26</div>
                    </div>
                    <div className="flex grow flex-col items-end">
                      <div className="font-medium">
                        <Badge
                          style={{
                            background: woofLevelBackground(point.level),
                          }}
                        >
                          {point.level}
                        </Badge>
                      </div>
                      <div className="text-sm opacity-60">
                        {point.distance ? (
                          `${point.distance}`
                        ) : (
                          <Loader2 className="animate-spin" size={16} />
                        )}
                      </div>
                    </div>
                  </div>
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
