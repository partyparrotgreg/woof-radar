"use client";

import { useState } from "react";

export const verbalWoofLevelBasedOnWoofLevel = (woofLevel: number) => {
  if (woofLevel === 0)
    return {
      label: "Silent",
      color: "text-green-500",
      border: "border-green-500",
      backgroundColor: "bg-green-100",
    };
  if (woofLevel === 25)
    return {
      label: "Low",
      color: "text-yellow-500",
      border: "border-yellow-500",
      backgroundColor: "bg-yellow-100",
    };
  if (woofLevel === 50)
    return {
      label: "Medium",
      color: "text-yellow-500",
      border: "border-yellow-500",
      backgroundColor: "bg-yellow-100",
    };
  if (woofLevel === 75)
    return {
      label: "High",
      color: "text-red-500",
      border: "border-red-500",
      backgroundColor: "bg-red-100",
    };
  if (woofLevel === 100)
    return {
      label: "Very high",
      color: "text-red-500",
      border: "border-red-500",
      backgroundColor: "bg-red-100",
    };
};

export const WoofForm = ({
  marker,
}: {
  marker: { lat: number; lng: number };
}) => {
  console.log(marker);
  // const { currentUser } = useAuth();
  const [woofLevel, setWoofLevel] = useState<number>(0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1 text-black">
          <div className="flex flex-row justify-between">
            <h3 className="text-lg font-semibold">Woof level</h3>
            <div
              className={`${verbalWoofLevelBasedOnWoofLevel(woofLevel)?.color}`}
            >
              {verbalWoofLevelBasedOnWoofLevel(woofLevel)?.label}
            </div>
          </div>
          <small>Tell us how loud is the barking around your location.</small>
        </div>
        <input
          type="range"
          min={0}
          max="100"
          value={woofLevel}
          onChange={(e) => setWoofLevel(Number(e.target.value))}
          className="range"
          step="25"
        />
        <div className="flex w-full justify-between px-2 text-xs">
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="btn btn-primary flex-grow">Submit</button>
      </div>
    </div>
  );
};
