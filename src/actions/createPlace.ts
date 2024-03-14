import { FormInputs } from "@/interfaces/formInterface";
import { toast } from "sonner";
import uploadPhotos from "./uploadPhotosCloudinary";
import getUser from "./getCurrentUser";

const createPlace = async (data: FormInputs, userId: string) => {
  try {
    const session = await getUser();
    const photosUrl = await uploadPhotos(data.photos);

    const response = await fetch(`/api/users/${session?.id}/places`, {
      method: "POST",
      body: JSON.stringify({ ...data, photos: photosUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      toast.error("There was an error creating the place");
      throw new Error(error.error);
    }
    toast.success("Place created successfully");
  } catch (error: any) {
    console.error(error);
  }
};

export default createPlace;
