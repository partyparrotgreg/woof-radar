import { WoofLevelIcon } from "@/components/WoofLevelIcon";
import { YourLocationIcon } from "@/components/YourLocation";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useAppStore } from "@/stores/app-store-provider";
import { api } from "@/trpc/react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { toast } from "./ui/use-toast";
/* 
 TODO: Form features
 1. User can create w new woof only if they are logged in
 2. If there's a woof in the database with the same location, you can't add a new one
 3. User can remove their woof
 
*/

export const WoofForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { location } = useCurrentLocation();
  const level = useAppStore((state) => state.level);
  const setLevel = useAppStore((state) => state.setLevel);

  const createWoof = api.woof.create.useMutation({
    onSuccess: () => {
      setLoading(false);
      toast({
        title: "Success",
        description: "Woof created",
        variant: "success",
      });
    },
    onError: (error) => {
      setLoading(false);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
      router.refresh();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!location) return;
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const level = Number(formData.get("level"));

    createWoof.mutate({
      level,
      lat: String(location?.coords.latitude),
      lng: String(location?.coords.longitude),
    });
  };

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
          name="level"
          id="level"
          defaultValue={[level]}
          value={[level]}
          max={99}
          min={10}
          level={level}
          onValueChange={(value) => setLevel(Number(value[0]))}
        />
        <p className="text-sm opacity-75">Adjust the barking level: {level}</p>
      </div>
    </form>
  );
};
