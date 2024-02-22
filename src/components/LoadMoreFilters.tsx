"use client";

import { useEffect, useState } from "react";
import { Photos, Place } from "@/interfaces/placeinterface";
import { getListings } from "@/actions/getListings";
import { useInView } from "react-intersection-observer";
import { Spinner } from "./Spinner";
import ListingCard from "./places/ListingCard";
import { getReservations } from "@/actions/getReservations";

type Props = {
  country: string;
  startDate: string;
  endDate: string;
  guests: number;
};

function LoadMoreFilters({ country, startDate, endDate, guests }: Props) {
  const { ref, inView } = useInView();
  const [places, setPlaces] = useState<Place[]>([]);
  const [photos, setPhotos] = useState<Photos[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (inView && hasMoreData) {
      getReservations({ country, startDate, endDate, guests }, page).then(
        (res: { place: Place; photos: Photos[] }[]) => {
          if (res.length > 0) {
            res.map((item) => {
              setPlaces((prev) => [...prev, item.place]);
              setPhotos((prev) => [...prev, ...item.photos]);
            });
            setPage((prev) => prev + 1);
          } else {
            setHasMoreData(false);
          }
        }
      );
    }
  }, [inView, hasMoreData]);
  return (
    <>
      <section
        className="grid grid-cols-1 gap-6 px-10 md:px-16 pb-10 md:grid-cols-2 xl:grid-cols-4"
        style={{ gridAutoRows: "400px" }}
      >
        {places.map((place) => {
          const placePhotos = photos.find(
            (photo) => place.id === photo.placeId
          );
          return (
            <article key={place.id}>
              <ListingCard place={place} photos={placePhotos} />
            </article>
          );
        })}
      </section>
      <div ref={ref} className="flex justify-center">
        {hasMoreData ? (
          <Spinner />
        ) : (
          <p className="text-center text-gray-500 font-semibold text-2xl pb-10">
            No more info to show
          </p>
        )}
      </div>
    </>
  );
}

export default LoadMoreFilters;
