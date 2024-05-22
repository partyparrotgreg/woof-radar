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
        "relative flex items-center justify-center border-2  border-background text-white shadow-lg",
      )}
      style={{
        background: woofLevelBackground(level),
        zIndex: 10 * index + 10,
      }}
    >
      <span className="absolute -translate-x-1 -translate-y-3 text-xl drop-shadow-md filter">
        {woofLevel(level)}
      </span>
      <span className="absolute bottom-px left-0 right-0 block text-center text-xs font-bold">
        {level}
      </span>
    </div>
  );
};
