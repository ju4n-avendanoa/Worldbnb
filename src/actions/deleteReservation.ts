import { baseUrl } from "@/utils/baseUrl";

export async function deleteReservation(reservationId: string, userId: string) {
  try {
    const response = await fetch(
      `${baseUrl}/api/users/${userId}/reservations/${reservationId}`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse);
    }
  } catch (error: any) {
    console.error(error);
  }
}
