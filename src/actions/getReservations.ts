import { ParamsProps } from "@/app/homes/page";
import { baseUrl } from "@/utils/baseUrl";
import { Photos, Places } from "@prisma/client";

export async function getReservations(
  { country, startDate, endDate, guests }: ParamsProps["searchParams"],
  page: number
) {
  try {
    const response = await fetch(
      `${baseUrl}/api/reservations?country=${country}&startDate=${startDate}&endDate=${endDate}&guests=${guests}&page=${page}`,
      {
        next: { revalidate: 360 },
      }
    );
    const places: (Places & {
      photos: Photos[];
    })[] = await response.json();

    return places || [];
  } catch (error: any) {
    console.log(error);
  }
}
