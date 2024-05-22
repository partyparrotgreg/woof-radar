import { YourLocationIcon } from "@/app/new/_components/YourLocation";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

export const WooFormV2 = () => {
  const [woofLevel, setWoofLevel] = useState<number>(20);
  const handleChange = (value: number) => {
    setWoofLevel(value);
  };
  return (
    <div className=" flex flex-col gap-4 rounded-lg bg-purple-200 p-4">
      <div className="flex flex-row items-center gap-2 ">
        <YourLocationIcon />
        <div className="grow">
          <div className="font-medium">Your location</div>
          <div className="text-sm opacity-60">Rua Dr Pita 26</div>
        </div>
        <Link href={"/new"}>
          <Button size={"sm"}>Save</Button>
        </Link>
      </div>
      <Slider
        defaultValue={[woofLevel]}
        value={[woofLevel]}
        max={100}
        step={20}
        level={woofLevel}
        onValueChange={(value) => handleChange(Number(value[0]))}
      />
      <p className="text-sm opacity-75">
        Adjust the barking level: {woofLevel}
      </p>
    </div>
  );
};
