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
        "h-8 w-8 rounded-xl p-2",
        "flex items-center justify-center border-2 border-background  text-white shadow-lg",
      )}
      style={{
        background: woofLevelBackground(level),
        zIndex: 10 * index + 10,
      }}
    >
      <span className="-translate-x-2 text-xl drop-shadow-md filter">
        {woofLevel(level)}
      </span>
      <span className="-translate-x-2 text-sm font-bold">{level}</span>
    </div>
  );
};
