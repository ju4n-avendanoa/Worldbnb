import { Photos } from "@/interfaces/placeinterface";
import { Reservations } from "@/interfaces/reservations";
import { baseUrl } from "@/utils/baseUrl";
import { Places } from "@prisma/client";

type Props = {
  reservation: Reservations;
  place: Places;
  photo: Photos;
};

export async function getUserReservations(userId: string) {
  try {
    const response = await fetch(`${baseUrl}/api/reservations/user/${userId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse);
    }
    const data: Props[] = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
  }
}
