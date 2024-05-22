import { YourLocationIcon } from "@/app/new/_components/YourLocation";
import { useAppStore } from "@/stores/app-store-provider";
import Link from "next/link";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { WoofLevelIcon } from "@/app/new/_components/WoofLevelIcon";
import { api } from "@/trpc/react";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { LoaderCircle, MapPin } from "lucide-react";

export const WooFormV2 = () => {
  const { location } = useCurrentLocation();
  const level = useAppStore((state) => state.level);
  const setLevel = useAppStore((state) => state.setLevel);
  const { mutate, error } = api.woof.create.useMutation();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!location) return;
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const level = Number(formData.get("level"));

    mutate({
      level,
      lat: location?.coords.latitude,
      lng: location?.coords.longitude,
      ownerId: 234234,
    });
  };

  useEffect(() => {
    if (location) {
      setDisabled(false);
    }
  }, [location]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <div className=" flex flex-col gap-4 rounded-lg bg-purple-200 p-4">
        <div className="flex flex-row items-center gap-2">
          {level > 0 ? (
            <WoofLevelIcon level={level} index={0} />
          ) : (
            <YourLocationIcon />
          )}
          <div className="grow">
            <div className="font-medium">Your location</div>
            <div className="text-sm opacity-60">Rua Dr Pita 26</div>
          </div>
          {!location ? (
            <div className="p-2">
              <LoaderCircle className="animate-spin" size={16} />
            </div>
          ) : (
            <Button disabled={loading}>
              {loading ? "One sec..." : "Save"}
            </Button>
          )}
        </div>
        <Slider
          id="title"
          defaultValue={[level]}
          value={[level]}
          max={100}
          step={20}
          level={level}
          onValueChange={(value) => setLevel(Number(value[0]))}
        />
        <p className="text-sm opacity-75">Adjust the barking level: {level}</p>
      </div>
    </form>
  );
};
