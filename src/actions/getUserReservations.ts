import { Photos, Places, Reservation } from "@prisma/client";
import { baseUrl } from "@/utils/baseUrl";
import getUser from "./getCurrentUser";

export async function getUserReservations() {
  try {
    const session = await getUser();

    console.log(session?.id);

    const response = await fetch(
      `${baseUrl}/api/reservations/user/${session?.id}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse);
    }
    const reservations: (Reservation & {
      listing: Places & {
        photos: Photos[];
      };
    })[] = await response.json();
    console.log(reservations);

    return reservations;
  } catch (error: any) {
    console.log(error);
  }
}
