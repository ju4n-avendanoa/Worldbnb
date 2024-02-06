import { baseUrl } from "./baseUrl";

export default async function getPlaces(userId: string) {
  try {
    const response = await fetch(`${baseUrl}/api/users/${userId}/places`);
    if (!response.ok) {
      console.log("error");
    }

    const placesInformation = await response.json();
    return placesInformation;
  } catch (error: any) {
    console.log(error);
  }
}
