export interface Landmark {
  id: string;
  name: string;
  description?: string;
  image?: string;
  /** Relative map coordinates from 0 to 100; add only after verification. */
  position?: { x: number; y: number };
  sourceUrl?: string;
  verified?: boolean;
}

/** Intentionally empty until reliable landmark names, locations, and sources are provided. */
export const landmarks: Landmark[] = [];
