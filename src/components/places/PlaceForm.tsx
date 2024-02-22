"use client";

import { Perks, Photos, Place } from "@/interfaces/placeinterface";
import { useEffect, useState } from "react";
import { FormInputs, Perk } from "@/interfaces/formInterface";
import { PlaceSchema } from "@/validations/placeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next-nprogress-bar";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import PerksList from "./PerksList";
import UploadImages from "./UploadImages";
import Loading from "@/app/loading";
import Input from "./Input";
import TextAreaInput from "./TextAreaInput";
import SelectCountries from "./SelectCountries";
import updatePlace from "@/actions/updatePlace";
import createPlace from "@/actions/createPlace";

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

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [cloudFilesToShow, setCloudFilesToShow] = useState<Photos[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  //fetch the data when editing a place

  useEffect(() => {
    if (!placeId) return;
    setLoading(true);
    const fetchPlaceForm = async () => {
      const response = await fetch(`/api/places/${placeId}`);
      const {
        place,
        perks,
        photos,
      }: { place: Place; perks: Perks; photos: Photos[] } =
        await response.json();

      setCloudFilesToShow(photos);

      Object.entries(place).forEach(([key, value]) =>
        setValue(key as keyof FormInputs, value as string | number)
      );

      Object.entries(perks).forEach(([key, value]) =>
        setValue(`perks.${key as keyof Perk}`, value as boolean)
      );
      setLoading(false);
    };

    fetchPlaceForm();
  }, [placeId, setValue]);

  //Submit function to create or edit a place

  const onSubmit = async (data: FormInputs) => {
    try {
      toast.promise(
        async () => {
          if (placeId) {
            await updatePlace(placeId, data, userId);
            router.push(`/myAccount/${userId}/places`);
            reset();
          } else {
            await createPlace(data, userId);
            router.push(`/myAccount/${userId}/places`);
            reset();
          }
        },
        {
          loading: "Saving...",
          success: "Place saved successfully!",
          error: "Failed to save place",
        }
      );
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
              <SelectCountries
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
              />
              <Input
                label="Price"
                description="Indicate price per night of your place."
                name="price"
                register={register}
                errors={errors}
                id="price"
                type="number"
              />
              <Input
                label="Check-In"
                description="Specify check-in timing. (0h-23h format)"
                name="checkIn"
                register={register}
                errors={errors}
                id="checkIn"
                type="number"
                min={0}
                max={23}
              />
              <Input
                label="Check-Out"
                description="Outline the check-out time. (0h-23h format)"
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
              <PerksList register={register} watch={watch} />
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
                  className="w-full p-3 text-base font-medium text-white border rounded-md bg-sky-600 hover:bg-sky-700 disabled:bg-gray-300"
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
