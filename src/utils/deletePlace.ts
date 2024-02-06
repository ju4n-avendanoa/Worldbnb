import { Photos } from "@/interfaces/placeinterface";

export async function deletePlace(placeId: string, photos: Photos[]) {
  try {
    const response = await fetch(`/api/places/${placeId}`, {
      method: "DELETE",
      body: JSON.stringify(photos),
      headers: { "Content-Type": "application/json" },
    });

    const serverResponse = await response.json();
    if (!response.ok) throw new Error(serverResponse);
    return serverResponse;
  } catch (error: any) {
    console.error(error);
    return error;
  }
}
