"use client";

import { useErrorStore } from "@/store/errorStore";
import { PlaceSchema } from "@/validations/placeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormInputs, Perk } from "@/interfaces/formInterface";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(PlaceSchema),
  });

  const { error, errorMessage, setError, setErrorMessage } = useErrorStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!placeId) return;
    setLoading(true);
    const fetchPlaceForm = async () => {
      const response = await fetch(
        `http://localhost:3000/api/places/${placeId}`,
        { cache: "no-store" }
      );
      const data = await response.json();

      Object.entries(data.filteredPlace).forEach(([key, value]) =>
        setValue(key as keyof FormInputs, value as string | number)
      );
      Object.entries(data.filteredPerks).forEach(([key, value]) =>
        setValue(`perks.${key as keyof Perk}`, value as boolean)
      );
      setLoading(false);
    };

    fetchPlaceForm();
  }, [placeId]);

  const onSubmit = async (data: FormInputs) => {
    if (placeId) {
      const response = await fetch(`/api/places/${placeId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setError(true);
        setErrorMessage("There was a problem, please try again later");
        return;
      }
      router.push(`/myAccount/${userId}/places`);
      reset();
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < data.photos.length; i++) {
      formData.append("photos", data.photos[i]);
    }

    const photosResponse = await fetch("/api/photos", {
      body: formData,
      method: "POST",
    });

    if (!photosResponse.ok) {
      setError(true);
      return;
    }

    const urlResponse = await photosResponse.json();
    console.log(urlResponse);
    const photosUrl = urlResponse.map((url: any) => url.secure_url);
    console.log(photosUrl);

    const response = await fetch(`/api/users/${userId}/places`, {
      method: "POST",
      body: JSON.stringify({ ...data, photos: photosUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("success");
    if (!response.ok) {
      setError(true);
      setErrorMessage("There was a problem, please try again later");
      return;
    }
    reset();
    router.push(`/myAccount/${userId}/places`);
  };

  return (
    <div className="flex flex-col items-center pt-10">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="text-3xl font-bold text-sky-700">Add a new place</h2>
          <form
            className="grid w-full grid-cols-1 gap-4 p-4 lg:grid-cols-2 place-items-center"
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
              <UploadImages register={register} errors={errors} />
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
