import { baseUrl } from "../utils/baseUrl";

export default async function getPlacesByUserId(userId: string) {
  try {
    const response = await fetch(`${baseUrl}/api/users/${userId}/places`, {
      cache: "no-store",
    });
    if (!response.ok) {
      const responseError = await response.json();
      throw new Error(responseError);
    }

    const placesInformation = await response.json();
    return placesInformation;
  } catch (error: any) {
    console.log(error);
  }
}
