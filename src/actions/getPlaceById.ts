import { baseUrl } from "@/utils/baseUrl";

export async function getPlaceById(placeId: string) {
  try {
    const response = await fetch(`${baseUrl}/api/places/${placeId}`);
  } catch (error: any) {}
}
