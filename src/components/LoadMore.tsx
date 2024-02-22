"use client";

import { Photos, Place } from "@/interfaces/placeinterface";
import { useInView } from "react-intersection-observer";
import { Spinner } from "./Spinner";
import { useEffect, useState } from "react";
import { getListings } from "@/actions/getListings";
import ListingCard from "./places/ListingCard";

let page = 2;

function LoadMore() {
  const { ref, inView } = useInView();
  const [places, setPlaces] = useState<Place[]>([]);
  const [photos, setPhotos] = useState<Photos[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true); // New state variable

  useEffect(() => {
    if (inView && hasMoreData) {
      getListings(page).then((res) => {
        console.log(res);
        if (res.places.length > 0) {
          setPlaces((prev) => [...prev, ...res.places]);
          setPhotos((prev) => [...prev, ...res.photos]);
          page++;
        } else {
          setHasMoreData(false);
        }
      });
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
      <div ref={ref}>
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

export default LoadMore;
