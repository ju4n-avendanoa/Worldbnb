import { Photos } from "@/interfaces/placeinterface";

export async function deletePlace(placeId: string, photos: Photos[]) {
  const response = await fetch(`/api/places/${placeId}`, {
    method: "DELETE",
    body: JSON.stringify(photos),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) console.log(response);
}
