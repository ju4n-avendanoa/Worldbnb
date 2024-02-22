import { FormInputs } from "@/interfaces/formInterface";
import { toast } from "sonner";
import uploadPhotos from "./uploadPhotosCloudinary";

const updatePlace = async (
  placeId: string,
  data: FormInputs,
  userId: string
) => {
  const photosUrl = await uploadPhotos(data.photos);

  const placeResponse = await fetch(`/api/places/${placeId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!placeResponse.ok) {
    const error = await placeResponse.json();
    toast.error("There was an error updating the place");
    throw new Error(error.error);
  }

  const photosResponse = await fetch(`/api/photos/${placeId}`, {
    method: "POST",
    body: JSON.stringify({ photosUrl }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!photosResponse.ok) {
    const error = await photosResponse.json();
    toast.error("There was an error updating photos");
    throw new Error(error.error);
  }

  toast.success("Place updated successfully");
};

export default updatePlace;
