export type Point = {
  id: string;
  level: number;
  lat: number;
  lng: number;
};

export type PointWithDistance = Point & {
  distance: number;
};
