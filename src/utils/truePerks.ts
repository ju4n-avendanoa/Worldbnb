import { Perk } from "@/interfaces/formInterface";

export function truePerks(perk: Perk) {
  const truePerks = Object.entries(perk)
    .filter(
      ([key, value]) => key !== "id" && key !== "placeId" && value === true
    )
    .map(([key]) => key);
  return truePerks;
}
