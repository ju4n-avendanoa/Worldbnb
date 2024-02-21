import { ParamsProps } from "@/app/homes/page";
import { baseUrl } from "@/utils/baseUrl";

export async function getReservations({
  country,
  startDate,
  endDate,
  guests,
}: ParamsProps["searchParams"]) {
  try {
    const response = await fetch(
      `${baseUrl}/api/reservations?country=${country}&startDate=${startDate}&endDate=${endDate}&guests=${guests}`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
  } catch (error: any) {
    console.log(error);
  }
}
