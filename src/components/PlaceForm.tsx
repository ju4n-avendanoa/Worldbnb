"use client";

import { PlaceSchema } from "@/validations/placeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormInputs, Perk } from "@/interfaces/formInterface";
import { useEffect, useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { ImageResponse } from "@/interfaces/cloudinaryResponse";
import { Photos } from "@/interfaces/placeinterface";
import { toast } from "sonner";
import Perks from "./Perks";
import UploadImages from "./UploadImages";
import Loading from "@/app/loading";
import Input from "./Input";
import TextAreaInput from "./TextAreaInput";

function PlaceForm({
  placeId,
  userId,
}: {
  placeId: string | undefined;
  userId: string;
}) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(PlaceSchema),
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [cloudFilesToShow, setCloudFilesToShow] = useState<Photos[]>([]);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //fetch the data when editing a place

  useEffect(() => {
    if (!placeId) return;
    setLoading(true);
    const fetchPlaceForm = async () => {
      const response = await fetch(
        `http://localhost:3000/api/places/${placeId}`
      );
      const data = await response.json();

      setCloudFilesToShow(data.filteredPhotos);
      Object.entries(data.filteredPlace).forEach(([key, value]) =>
        setValue(key as keyof FormInputs, value as string | number)
      );

      Object.entries(data.filteredPerks).forEach(([key, value]) =>
        setValue(`perks.${key as keyof Perk}`, value as boolean)
      );
      setLoading(false);
    };

    fetchPlaceForm();
  }, [placeId, setValue]);

  //Submit function to create or edit a place

  const onSubmit = async (data: FormInputs) => {
    try {
      let urlResponse: ImageResponse[] = [];
      let photosUrl: Omit<Photos, "placeId">[] = [];
      if (data.photos.length > 0) {
        const formData = new FormData();

        for (let i = 0; i < data.photos.length; i++) {
          let file = data.photos[i];
          formData.append("file", file);
          formData.append("upload_preset", "Places_airbnb");

          const photosResponse = await fetch(
            `https://api.cloudinary.com/v1_1/dhjqarghy/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          if (!photosResponse.ok) continue;
          urlResponse.push(await photosResponse.json());
        }
        photosUrl = urlResponse.map((image: ImageResponse) => ({
          photoId: image.public_id,
          url: image.secure_url,
        }));
      }

      if (placeId) {
        const placeResponse = await fetch(`/api/places/${placeId}`, {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!placeResponse.ok) {
          const error = await placeResponse.json();
          toast.error("There was an error, please try again later");
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
          toast.error("There was an error, please try again later");
          const error = await photosResponse.json();
          throw new Error(error.error);
        }
        toast.success("Place updated successfully");
        router.push(`/myAccount/${userId}/places`);
        reset();
        return;
      }

      const response = await fetch(`/api/users/${userId}/places`, {
        method: "POST",
        body: JSON.stringify({ ...data, photos: photosUrl }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        toast.error("There was an error, please try again later");
        const error = await response.json();
        throw new Error(error.error);
      }
      toast.success("Place created successfully");
      router.push(`/myAccount/${userId}/places`);
      reset();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="text-3xl font-bold text-sky-700">
            {placeId ? "Edit your place" : "Add a new place"}
          </h2>
          <form
            className="grid w-full grid-cols-1 gap-4 p-4 lg:grid-cols-2 place-items-start"
            onSubmit={handleSubmit(onSubmit)}
          >
            <section className="w-full px-10">
              <Input
                id="title"
                type="text"
                label="Title"
                description="Enter a catchy and brief title to attract guests."
                name="title"
                register={register}
                errors={errors}
              />
              <Input
                id="address"
                type="text"
                label="Address"
                description="Provide the accurate address for easy navigation."
                name="address"
                register={register}
                errors={errors}
              />
              <TextAreaInput
                label="Description"
                description="Craft a short, enticing property overview."
                name="description"
                register={register}
                errors={errors}
                id="description"
              />
              <TextAreaInput
                label="Extra Info"
                description="Share important additional details or house rules."
                name="extraInfo"
                register={register}
                errors={errors}
                id="extraInfo"
              />
              <Input
                label="Check In"
                description="Specify check-in timing."
                name="checkIn"
                register={register}
                errors={errors}
                id="checkIn"
                type="number"
                min={0}
                max={23}
              />
              <Input
                label="Check Out"
                description="Outline the check-out time."
                name="checkOut"
                register={register}
                errors={errors}
                id="checkOut"
                type="number"
                min={0}
                max={23}
              />
            </section>
            <section className="w-full px-10">
              <Perks register={register} watch={watch} />
              <UploadImages
                register={register}
                errors={errors}
                setValue={setValue}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                cloudFilesToShow={cloudFilesToShow}
                setCloudFilesToShow={setCloudFilesToShow}
              />
              <Input
                label="Max guests"
                description="Indicate the maximum number of guests your property can
                accommodate comfortably."
                name="maxGuests"
                register={register}
                errors={errors}
                id="maxGuests"
                type="number"
                min={0}
              />
              <div className="py-3">
                <button
                  type="submit"
                  className="w-full p-3 text-base font-medium text-white border rounded-md bg-sky-600 hover:bg-sky-700"
                  disabled={isSubmitting}
                >
                  add new place
                </button>
              </div>
            </section>
          </form>
        </>
      )}
    </div>
  );
}

export default PlaceForm;
