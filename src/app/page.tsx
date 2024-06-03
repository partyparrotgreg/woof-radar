"use client";

import { MapView } from "@/components/MapView";
import { WoofCard } from "@/components/WoofCard";

import { usePoints } from "@/hooks/usePoints";

const PublicWoofsList = () => {
  const { pointsWithDistance } = usePoints();
  return (
    <div className="flex flex-col gap-1">
      {pointsWithDistance?.map((point, index) => (
        <WoofCard key={point.id} point={point} index={index} />
      ))}
    </div>
  );
};

const MyWoofsList = () => {
  const { pointsWithDistance } = usePoints();
  return (
    <div className="flex flex-col gap-1">
      <div>asdasd</div>
    </div>
  );
};

const pageContent = [
  {
    title: "All Woofs",
    content: <PublicWoofsList />,
    slug: "all-woofs",
  },
  {
    title: "My Woofs",
    content: <MyWoofsList />,
    slug: "my-woofs",
  },
];

export default function Home() {
  return (
    <div className="flex w-full grow ">
      <MapView />
    </div>
  );
}

