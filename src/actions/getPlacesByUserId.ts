"use server";

import { Perks, Photos, Places } from "@prisma/client";
import { baseUrl } from "../utils/baseUrl";
import getUser from "./getCurrentUser";

export default async function getPlacesByUserId() {
  try {
    const session = await getUser();

    const response = await fetch(`${baseUrl}/api/users/${session?.id}/places`, {
      cache: "no-store",
    });
    if (!response.ok) {
      const responseError = await response.json();
      throw new Error(responseError);
    }

    const placesInformation: (Places & {
      photos: Photos[];
      perks: Perks[];
    })[] = await response.json();

    return placesInformation;
  } catch (error: any) {
    console.log(error);
  }
}
