"use client";

import React from "react";
import ImageWithFallback from "../ImageWithFallback";
import { fallbackImage } from "@/utils/fallbackImage";
import { Photos, Place } from "@/interfaces/placeinterface";
import { useRouter } from "next-nprogress-bar";

type Props = {
  place: Place;
  photos: Photos | undefined;
};

function ListingCard({ place, photos }: Props) {
  const router = useRouter();
  return (
    <article
      key={place.id}
      className="transition hover:scale-105 duration-200 cursor-pointer"
      onClick={() => router.push(`/places/${place.id}`)}
    >
      <ImageWithFallback
        src={photos?.url!}
        alt="photo"
        width={1000}
        height={1000}
        fallbackSrc={fallbackImage}
        className="rounded-2xl h-2/3 object-cover w-full"
      />
      <h3>{place.title}</h3>
      <p>{place.address}</p>
    </article>
  );
}

export default ListingCard;
