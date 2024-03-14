"use client";

import { differenceInDays, eachDayOfInterval } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { fallbackImage } from "@/utils/fallbackImage";
import { Reservations } from "@/interfaces/reservations";
import { truePerks } from "@/utils/truePerks";
import { useRouter } from "next-nprogress-bar";
import { Range } from "react-date-range";
import { toast } from "sonner";
import ShowMorePhotosButton from "@/components/ShowMorePhotosButton";
import ImageWithFallback from "@/components/ImageWithFallback";
import PlaceReservation from "@/components/places/PlaceReservation";
import PhotoCarousel from "@/components/photos/PhotoCarousel";
import useCountries from "@/hooks/useCountries";
import PerksBanner from "@/components/places/PerksBanner";
import Heading from "@/components/Heading";
import dynamic from "next/dynamic";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Perks, Photos, Places } from "@prisma/client";

const Mapa = dynamic(() => import("@/components/Mapa"), { ssr: false });

type Props = {
  place: Places & {
    photos: Photos[];
    perks: Omit<Perks[], "id" | "placeId">;
  };
  reservations?: Reservations[];
  currentUser:
    | ({
        id: string | undefined;
      } & {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      })
    | undefined;
};

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

function PlaceInfo({ place, reservations = [], currentUser }: Props) {
  const [showCarousel, setShowCarousel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(place?.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const { getCountryByExactName } = useCountries();

  const router = useRouter();
  const country = getCountryByExactName(place.country);

  let placePerks: string[] = [];
  placePerks = truePerks(place.perks[0]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const onCreateReservation = async () => {
    if (!currentUser) {
      return router.push("/login");
    }
    try {
      toast.promise(
        async () => {
          setIsLoading(true);

          const response = await fetch(`/api/reservations/${place.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              totalPrice,
              startDate: dateRange.startDate,
              endDate: dateRange.endDate,
              placeId: place.id,
              userId: currentUser.id,
            }),
          });

          if (!response.ok) {
          }

          setDateRange(initialDateRange);
          setIsLoading(false);
        },
        {
          loading: "Saving...",
          success: "Reservation was made successfully!",
          error: "Failed to reserve this place",
        }
      );
      router.push(`/myAccount/${currentUser.id}/trips`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && place.price) {
        setTotalPrice(dayCount * place.price);
      } else {
        setTotalPrice(place.price);
      }
    }
  }, [dateRange, place?.price]);

  return (
    <>
      <div className="px-4 py-4 md:px-20 lg:px-40 xl:px-48">
        <h2 className="py-3 text-xl font-semibold lg:text-3xl">{`${place?.title}, ${place?.country}`}</h2>
        <section
          className={`${
            place.photos?.length === 3
              ? "grid-cols-3"
              : "grid-cols-2 lg:grid-cols-4"
          }
        relative grid  gap-2 py-3`}
          style={{ gridAutoRows: "175px" }}
        >
          {place.photos?.map((photo, index) => {
            if (index > 4) return;
            return (
              <ImageWithFallback
                src={photo.url}
                alt="photo"
                width={1000}
                height={1000}
                fallbackSrc={fallbackImage}
                key={photo.photoId}
                className={`
              ${place.photos?.length <= 2 ? "one-two-children" : ""}
              ${
                place.photos?.length === 3 || place.photos.length >= 5
                  ? "three-five-children"
                  : ""
              }
              object-cover h-full rounded-lg`}
              />
            );
          })}
          {place.photos?.length > 5 && (
            <div className="absolute bottom-5 right-2">
              <ShowMorePhotosButton setShowCarousel={setShowCarousel} />
            </div>
          )}
          <PhotoCarousel
            showCarousel={showCarousel}
            setShowCarousel={setShowCarousel}
            photos={place.photos}
          />
        </section>
        <section className="flex flex-col gap-10 py-4 lg:flex-row">
          <section className="flex flex-col w-full gap-10 lg:w-1/2">
            <Heading
              title="Where Tranquility Resides"
              description={place?.address}
            />
            <Heading
              title="Unveiling Your Dream Getaway"
              description={place?.description}
            />
            <Heading title="Beyond the Basics" description={place?.extraInfo} />
            <div className="flex flex-col gap-2 pb-2">
              <h4 className="text-base font-semibold md:text-xl">
                Modern Comforts Await You
              </h4>
              <div className="flex flex-wrap w-full gap-2 ">
                {placePerks.map((perk, index) => (
                  <div key={index}>
                    <PerksBanner perk={perk} />
                  </div>
                ))}
              </div>
            </div>
            <Mapa center={country!.latlng} />
            <Heading
              title="Your Welcome Moment"
              description={`${place?.checkIn.toString()}:00 h`}
            />
            <Heading
              title="Leave with Lasting Memories"
              description={`${place?.checkOut.toString()}:00 h`}
            />
            <Heading
              title="Perfect Group Getaway"
              description={`${place?.maxGuests} people`}
            />
          </section>
          <section className="relative w-full lg:w-1/2">
            <div className="sticky top-0 left-0 flex flex-col justify-center gap-10">
              <Heading
                title="Reservations"
                description="Select optimal dates for a seamless experience."
              />
              <div className="flex justify-center">
                <PlaceReservation
                  price={place?.price}
                  currency={place?.currency}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                />
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}

export default PlaceInfo;
