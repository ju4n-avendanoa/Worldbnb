import { baseUrl } from "./baseUrl";

export default async function getPlaces(userId: string) {
  try {
    const response = await fetch(`${baseUrl}/api/users/${userId}/places`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.log("error");
    }

    const placesInformation = await response.json();

    console.log(placesInformation);

    return placesInformation;
  } catch (error: any) {
    console.log(error);
  }
}
