import { generateEntries } from "@/lib/utils";
import { useMemo } from "react";

export const useDummyPoints = () => {
  const memoPoints = useMemo(() => {
    return generateEntries(32.6395634, -16.9298612, 50);
  }, []);
  return memoPoints;
};
