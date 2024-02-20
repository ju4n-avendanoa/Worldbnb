import { Reservations } from "@/interfaces/reservations";
import { baseUrl } from "@/utils/baseUrl";

export async function getReservations(placeId?: string) {
  try {
    const response = await fetch(
      `${baseUrl}/api/reservations?placeId=${placeId}`
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse);
    }
    const reservations: Reservations[] = await response.json();
    return reservations;
  } catch (error: any) {
    console.error(error);
  }
}
