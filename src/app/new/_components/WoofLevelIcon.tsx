import { cn, woofLevel, woofLevelBackground } from "@/lib/utils";

export const WoofLevelIcon = ({
  level,
  index,
}: {
  level: number;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "h-8 w-8 rounded-full",
        "flex items-center justify-center border-2 border-background text-xl text-white shadow-lg",
      )}
      style={{
        background: woofLevelBackground(level),
        zIndex: 10 * index + 10,
      }}
    >
      {woofLevel(level)}
    </div>
  );
};
