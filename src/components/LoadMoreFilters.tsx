"use client";

import { useEffect, useState } from "react";
import { getReservations } from "@/actions/getReservations";
import { useInView } from "react-intersection-observer";
import { Spinner } from "./loading/Spinner";
import ListingCard from "./places/ListingCard";
import { Photos, Places } from "@prisma/client";

type Props = {
  country: string;
  startDate: string;
  endDate: string;
  guests: number;
};

function LoadMoreFilters({ country, startDate, endDate, guests }: Props) {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [places, setPlaces] = useState<(Places & { photos: Photos[] })[]>([]);
  const { ref, inView } = useInView();
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (inView && hasMoreData) {
      getReservations({ country, startDate, endDate, guests }, page).then(
        (places) => {
          if (!places) return;
          if (places.length > 0) {
            setPlaces((prev) => [...prev, ...places]);
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
    setPage(2);
  }, [country, startDate, endDate, guests]);

  return (
    <>
      <section
        className="grid grid-cols-1 gap-6 px-10 pb-10 md:px-16 md:grid-cols-2 xl:grid-cols-4"
        style={{ gridAutoRows: "400px" }}
      >
        {places.map((place) => {
          return (
            <article key={place.id}>
              <ListingCard place={place} />
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
