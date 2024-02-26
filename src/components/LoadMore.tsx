"use client";

import { useEffect, useState } from "react";
import { Photos, Place } from "@/interfaces/placeinterface";
import { getListings } from "@/actions/getListings";
import { useInView } from "react-intersection-observer";
import { Spinner } from "./loading/Spinner";
import ListingCard from "./places/ListingCard";

function LoadMore() {
  const { ref, inView } = useInView();
  const [places, setPlaces] = useState<Place[]>([]);
  const [photos, setPhotos] = useState<Photos[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (inView && hasMoreData) {
      getListings(page).then((res) => {
        if (res) {
          setPlaces((prev) => [...prev, ...res.places]);
          setPhotos((prev) => [...prev, ...res.photos]);
          setPage((prev) => prev + 1);
        } else {
          setHasMoreData(false);
        }
      });
    }
  }, [inView, hasMoreData, page]);
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
            No more places to show
          </p>
        )}
      </div>
    </>
  );
}

export default LoadMore;
