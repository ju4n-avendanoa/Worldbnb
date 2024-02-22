"use client";

import { differenceInDays, eachDayOfInterval } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { Perks, Photos, Place } from "@/interfaces/placeinterface";
import { fallbackImage } from "@/utils/fallbackImage";
import { Reservations } from "@/interfaces/reservations";
import { truePerks } from "@/utils/truePerks";
import { useRouter } from "next-nprogress-bar";
import { Session } from "next-auth";
import { Range } from "react-date-range";
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

const Mapa = dynamic(() => import("@/components/Mapa"), { ssr: false });

type Props = {
  place: Place;
  perks: Perks;
  photos: Photos[];
  reservations?: Reservations[];
  currentUser: Session | null;
};

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

function PlaceInfo({
  place,
  perks,
  photos,
  reservations = [],
  currentUser,
}: Props) {
  const [showCarousel, setShowCarousel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(place?.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const { getCountryByExactName } = useCountries();

  const router = useRouter();
  const country = getCountryByExactName(place.country);

  let placePerks: string[] = [];
  if (perks) {
    placePerks = truePerks(perks);
  }

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
        userId: currentUser.user.id,
      }),
    });

    if (!response.ok) {
      console.log("error");
    }
    setDateRange(initialDateRange);
    setIsLoading(false);
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
      <div className="px-4 md:px-20 lg:px-40 xl:px-48 py-4">
        <h2 className="py-3 text-3xl font-semibold">{`${place?.title}, ${place?.country}`}</h2>
        <section
          className={`${
            photos?.length === 3 ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-4"
          }
        relative grid  gap-2 py-3`}
          style={{ gridAutoRows: "175px" }}
        >
          {photos?.map((photo, index) => {
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
              ${photos?.length <= 2 ? "one-two-children" : ""}
              ${
                photos?.length === 3 || photos.length >= 5
                  ? "three-five-children"
                  : ""
              }
              object-cover h-full rounded-lg`}
              />
            );
          })}
          {photos?.length > 5 && (
            <div className="absolute bottom-5 right-2">
              <ShowMorePhotosButton setShowCarousel={setShowCarousel} />
            </div>
          )}
          <PhotoCarousel
            showCarousel={showCarousel}
            setShowCarousel={setShowCarousel}
            photos={photos}
          />
        </section>
        <section className="flex flex-col lg:flex-row gap-10 py-4">
          <section className="flex flex-col gap-10 w-full lg:w-1/2">
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
              <h4 className="font-semibold text-base md:text-xl">
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
          <section className="w-full lg:w-1/2 relative">
            <div className="sticky top-0 left-0 flex justify-center flex-col gap-10">
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
