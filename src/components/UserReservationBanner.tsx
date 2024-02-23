"use client";

import { Photos } from "@/interfaces/placeinterface";
import { fallbackImage } from "@/utils/fallbackImage";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next-nprogress-bar";
import { toast } from "sonner";
import ImageWithFallback from "@/components/ImageWithFallback";
import { Reservations } from "@/interfaces/reservations";
import { Places } from "@prisma/client";
import { addComma } from "@/utils/addComma";

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

  console.log(reservation);

  return (
    <section className="flex w-full gap-4 flex-col md:flex-row h-full overflow-hidden">
      <section className="absolute -top-4 right-2 md:top-2 md:right-2">
        <div
          className="flex items-center h-8 gap-2 px-2 text-sm bg-red-500 rounded-lg cursor-pointer justify-evenly w-min lg:w-20 hover:bg-red-700"
          onClick={() => {}}
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
