"use client";

import { deleteReservation } from "@/actions/deleteReservation";
import { fallbackImage } from "@/utils/fallbackImage";
import { Reservations } from "@/interfaces/reservations";
import {
  InformationCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next-nprogress-bar";
import { addComma } from "@/utils/addComma";
import { Places } from "@prisma/client";
import { Photos } from "@/interfaces/placeinterface";
import { toast } from "sonner";
import ImageWithFallback from "@/components/ImageWithFallback";

type Props = {
  place: Places;
  photo: Photos;
  reservation: Reservations;
};
function UserReservationBanner({ place, photo, reservation }: Props) {
  const router = useRouter();
  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="flex flex-col w-full h-full gap-4 overflow-hidden md:flex-row">
      <section className="absolute flex gap-1 -top-4 right-2 md:top-2 md:right-2">
        <div
          className="flex items-center h-8 gap-2 px-2 text-sm rounded-lg cursor-pointer justify-evenly bg-sky-500 w-min lg:w-20 hover:bg-sky-700"
          onClick={() => router.push(`/places/${place.id}`)}
        >
          <p className="text-white max-lg:hidden">info</p>
          <InformationCircleIcon color="white" className="w-6 h-auto" />
        </div>
        <div
          className="flex items-center h-8 gap-2 px-2 text-sm bg-red-500 rounded-lg cursor-pointer justify-evenly w-min lg:w-20 hover:bg-red-700"
          onClick={() => {
            toast.promise(
              deleteReservation(reservation.id, reservation.userId),
              {
                loading: "Loading...",
                success: () => {
                  router.refresh();
                  return "Reservation deleted successfuly";
                },
                error: "Error deleting the reservation, please try again later",
              }
            );
          }}
        >
          <p className="text-white max-lg:hidden">delete</p>
          <TrashIcon color="white" className="w-4 h-auto" />
        </div>
      </section>
      <div className="w-full h-2/5 md:h-full md:w-1/3 max-md:pt-2">
        <ImageWithFallback
          src={photo.url}
          fallbackSrc={fallbackImage}
          alt="picture"
          height={1000}
          width={1000}
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>
      <div className="flex flex-col w-full h-full gap-2 md:w-2/3">
        <h4 className="font-bold">Title:</h4>
        <p className="line-clamp-1">{place.title}</p>
        <h4 className="font-bold">Address:</h4>
        <p className="line-clamp-1">{place.address}</p>
        <h4 className="font-bold">Description:</h4>
        <p className="whitespace-pre-line line-clamp-3">{place.description}</p>
        <h4 className="font-bold">Dates:</h4>
        <p>{`${formatDate(reservation.startDate)} - ${formatDate(
          reservation.endDate
        )}`}</p>
        <h4 className="font-bold">Total price:</h4>
        <p>{`${addComma(reservation.totalPrice)} ${place.currency}`}</p>
      </div>
    </section>
  );
}

export default UserReservationBanner;
