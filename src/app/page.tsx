"use client";

import { MapView } from "@/components/MapView";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="fixed left-0 right-auto top-0 isolate z-[999] p-4">
        <div className="flex shrink justify-between gap-2 rounded-lg bg-background p-2">
          <div className="text-2xl">🐶📌</div>
          <div className="flex gap-2">
            <Button variant={"ghost"} size={"sm"}>
              Log in
            </Button>
            <Button size={"sm"}>Sign up</Button>
          </div>
        </div>
      </div>
      <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <MapView />
      </APIProvider>
    </main>
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
