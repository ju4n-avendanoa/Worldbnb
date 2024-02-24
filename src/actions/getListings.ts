import { Perks, Photos, Place } from "@/interfaces/placeinterface";
import { baseUrl } from "../utils/baseUrl";

type QueryProps = {
  places: Place[];
  photos: Photos[];
  perks: Perks[];
};

export async function getListings(page: number) {
  try {
    const response = await fetch(`${baseUrl}/api/places?page=${page}`, {
      next: { revalidate: 172800 },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse);
    }
    const data: QueryProps = await response.json();

    const { places, perks, photos } = data;
    return { places, perks, photos };
  } catch (error: any) {
    throw new Error(error);
  }
}
