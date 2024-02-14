import { baseUrl } from "../utils/baseUrl";

export default async function getPlacesByUserId(userId: string) {
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
