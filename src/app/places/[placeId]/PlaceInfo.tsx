"use client";

import ImageWithFallback from "@/components/ImageWithFallback";
import ShowMorePhotosButton from "@/components/ShowMorePhotosButton";
import PhotoCarousel from "@/components/photos/PhotoCarousel";
import { Perks, Photos, Place } from "@/interfaces/placeinterface";
import { fallbackImage } from "@/utils/fallbackImage";
import { useState } from "react";

type Props = {
  place: Place;
  perks: Perks;
  photos: Photos[];
};

function PlaceInfo({ place, perks, photos }: Props) {
  const [showCarousel, setShowCarousel] = useState(false);
  console.log(photos.length);

  return (
    <>
      <div className="px-4 md:px-20 lg:px-40 xl:px-48 py-8">
        <h2 className="py-3 text-3xl font-semibold">{place.title}</h2>
        <section
          className={`${
            photos.length === 3 ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-4"
          }
        relative grid  gap-2 py-3`}
          style={{ gridAutoRows: "175px" }}
        >
          {photos.map((photo, index) => {
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
              ${photos.length <= 2 ? "one-two-children" : ""}
              ${
                photos.length === 3 || photos.length >= 5
                  ? "three-five-children"
                  : ""
              }
              object-cover h-full rounded-lg`}
              />
            );
          })}
          {photos.length > 5 && (
            <div className="absolute bottom-5 right-2">
              <ShowMorePhotosButton setShowCarousel={setShowCarousel} />
            </div>
          )}
        </section>
        <h4 className="py-3 text-3xl font-semibold">{place.country}</h4>
      </div>
      <PhotoCarousel
        showCarousel={showCarousel}
        setShowCarousel={setShowCarousel}
        photos={photos}
      />
    </>
  );
}

export default PlaceInfo;
