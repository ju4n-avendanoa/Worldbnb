import { FormInputs } from "@/interfaces/formInterface";
import uploadPhotos from "./uploadPhotosCloudinary";
import { toast } from "sonner";

const createPlace = async (data: FormInputs, userId: string) => {
  try {
    const photosUrl = await uploadPhotos(data.photos);

    const response = await fetch(`/api/users/${userId}/places`, {
      method: "POST",
      body: JSON.stringify({ ...data, photos: photosUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("aqui");
    const datasa = await response.json();
    console.log(datasa);
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
