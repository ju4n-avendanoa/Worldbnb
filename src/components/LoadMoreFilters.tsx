"use client";

import { useEffect, useState } from "react";
import { getReservations } from "@/actions/getReservations";
import { Photos, Place } from "@/interfaces/placeinterface";
import { useInView } from "react-intersection-observer";
import { Spinner } from "./loading/Spinner";
import ListingCard from "./places/ListingCard";

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
  }, [inView, hasMoreData, country, startDate, endDate, page, guests]);

  useEffect(() => {
    setHasMoreData(true);
    setPlaces([]);
    setPhotos([]);
    setPage(2);
  }, [country, startDate, endDate, guests]);

  console.log(page);

  return (
    <>
      <section
        className="grid grid-cols-1 gap-6 px-10 pb-10 md:px-16 md:grid-cols-2 xl:grid-cols-4"
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
          <p className="pb-10 text-2xl font-semibold text-center text-gray-500">
            No more info to show
          </p>
        )}
      </div>
    </>
  );
}

export default LoadMoreFilters;
