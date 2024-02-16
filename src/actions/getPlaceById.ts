import { Perks, Photos, Place } from "@/interfaces/placeinterface";
import { baseUrl } from "@/utils/baseUrl";

type QueryProps = {
  filteredPlace: Place;
  filteredPhotos: Photos[];
  filteredPerks: Perks;
};

export async function getPlaceById(placeId: string) {
  try {
    const response = await fetch(`${baseUrl}/api/places/${placeId}`);

    if (!response.ok) {
      const responseError = await response.json();
      throw new Error(responseError);
    }

    const {
      filteredPlace: place,
      filteredPhotos: photos,
      filteredPerks: perks,
    }: QueryProps = await response.json();
    if (place === undefined || photos === undefined || perks === undefined) {
      throw new Error("Invalid response format");
    }
    return { place, photos, perks };
  } catch (error: any) {
    console.error(error);
  }
}
