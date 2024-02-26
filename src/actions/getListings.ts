import { Perks, Photos, Place } from "@/interfaces/placeinterface";
import { baseUrl } from "../utils/baseUrl";

type QueryProps = {
  places: Place[];
  photos: Photos[];
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
    return data;
  } catch (error: any) {
    console.log(error);
  }
}
