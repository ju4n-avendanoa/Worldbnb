import { baseUrl } from "@/utils/baseUrl";
import { Perks, Photos, Places } from "@prisma/client";

export async function getPlaceById(placeId: string) {
  try {
    const response = await fetch(`${baseUrl}/api/places/${placeId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      const responseError = await response.json();
      throw new Error(responseError);
    }

    const places:
      | (Places & {
          photos: Photos[];
          perks: Omit<Perks, "id" | "placeId">;
        })
      | null = await response.json();

    return places;
  } catch (error: any) {
    console.error(error);
  }
}
