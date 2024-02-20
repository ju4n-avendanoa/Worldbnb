import { Perks, Photos, Place } from "@/interfaces/placeinterface";
import { baseUrl } from "@/utils/baseUrl";

type QueryProps = {
  place: Place;
  photos: Photos[];
  perks: Perks;
};

export async function getPlaceById(placeId: string) {
  try {
    const response = await fetch(`${baseUrl}/api/places/${placeId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      const responseError = await response.json();
      throw new Error(responseError);
    }

    const data: QueryProps = await response.json();
    const { place, photos, perks } = data;

    if (place === undefined) {
      return null;
    }
    return { place, photos, perks };
  } catch (error: any) {
    console.error(error);
  }
}
