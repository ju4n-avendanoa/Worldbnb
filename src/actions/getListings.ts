import { baseUrl } from "../utils/baseUrl";
import { Photos, Places } from "@prisma/client";

export async function getListings(page: number) {
  try {
    const response = await fetch(`${baseUrl}/api/places?page=${page}`, {
      next: { revalidate: 172800 },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse);
    }
    const places: (Places & {
      photos: Photos[];
    })[] = await response.json();

    places.map((place) => console.log(place.title));

    return places;
  } catch (error: any) {
    console.log(error);
  }
}
