import { baseUrl } from "../utils/baseUrl";

export async function getListings() {
  try {
    const response = await fetch(`${baseUrl}/api/places`, {
      cache: "no-store",
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse);
    }
    const { places, perks, photos } = await response.json();
    return { places, perks, photos };
  } catch (error: any) {
    throw new Error(error);
  }
}
