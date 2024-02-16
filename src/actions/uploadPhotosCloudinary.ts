import { ImageResponse } from "@/interfaces/cloudinaryResponse";
import { toast } from "sonner";

const uploadPhotos = async (photos: File[]) => {
  let urlResponse: ImageResponse[] = [];

  if (photos.length > 0) {
    const formData = new FormData();
    for (let i = 0; i < photos.length; i++) {
      let file = photos[i];
      formData.append("file", file);
      formData.append("upload_preset", "Places_airbnb");

      try {
        const photosResponse = await fetch(
          `https://api.cloudinary.com/v1_1/dhjqarghy/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        toast.success(`Photo: ${file.name} added`);

        if (photosResponse.ok) {
          urlResponse.push(await photosResponse.json());
        }
      } catch (error: any) {
        toast.error(`Photo: ${file.name} was not added`);
      }
    }
  }

  return urlResponse.map((image: ImageResponse) => ({
    photoId: image.public_id,
    url: image.secure_url,
  }));
};

export default uploadPhotos;
