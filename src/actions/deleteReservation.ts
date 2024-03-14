"use server";

import { baseUrl } from "@/utils/baseUrl";
import getUser from "./getCurrentUser";

export async function deleteReservation(reservationId: string, userId: string) {
  try {
    const session = await getUser();

    const response = await fetch(
      `${baseUrl}/api/users/${session?.id}/reservations/${reservationId}`,
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
