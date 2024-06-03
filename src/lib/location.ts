import { useMemo } from "react";

export const getCurrentLocation = async () => {
  return new Promise((resolve, reject) => {
    useMemo(
      () => navigator.geolocation.getCurrentPosition(resolve, reject),
      [reject, resolve],
    );
  });
};
