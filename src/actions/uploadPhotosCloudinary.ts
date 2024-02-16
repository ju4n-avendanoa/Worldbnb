import { ImageResponse } from "@/interfaces/cloudinaryResponse";

const uploadPhotos = async (photos: File[]) => {
  let urlResponse: ImageResponse[] = [];

  if (photos.length > 0) {
    const formData = new FormData();
    for (let i = 0; i < photos.length; i++) {
      let file = photos[i];
      formData.append("file", file);
      formData.append("upload_preset", "Places_airbnb");

      const photosResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dhjqarghy/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (photosResponse.ok) {
        urlResponse.push(await photosResponse.json());
      }
    }
  }

  return urlResponse.map((image: ImageResponse) => ({
    photoId: image.public_id,
    url: image.secure_url,
  }));
};

export default uploadPhotos;
