"use client";

import { Perks, Photos, Place } from "@/interfaces/placeinterface";
import { fallbackImage } from "@/utils/fallbackImage";
import { truePerks } from "@/utils/truePerks";
import { useState } from "react";
import { addComma } from "@/utils/addComma";
import Heading from "@/components/Heading";
import ImageWithFallback from "@/components/ImageWithFallback";
import ShowMorePhotosButton from "@/components/ShowMorePhotosButton";
import PhotoCarousel from "@/components/photos/PhotoCarousel";
import PerksBanner from "@/components/places/PerksBanner";

type Props = {
  place: Place;
  perks: Perks;
  photos: Photos[];
};

function PlaceInfo({ place, perks, photos }: Props) {
  const [showCarousel, setShowCarousel] = useState(false);

  let placePerks: string[] = [];
  if (perks) {
    placePerks = truePerks(perks);
  }

  return (
    <>
      <div className="px-4 md:px-20 lg:px-40 xl:px-48 py-4">
        <h2 className="py-3 text-3xl font-semibold">{`${place.title}, ${place.country}`}</h2>
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
        <section className="flex flex-col gap-10 py-4">
          <PhotoCarousel
            showCarousel={showCarousel}
            setShowCarousel={setShowCarousel}
            photos={photos}
          />
          <Heading
            title="Where Tranquility Resides"
            description={place.address}
          />
          <Heading
            title="Unveiling Your Dream Getaway"
            description={place.description}
          />
          <Heading title="Beyond the Basics" description={place.extraInfo} />
          <Heading
            title="Your Welcome Moment"
            description={`${place.checkIn.toString()}:00 h`}
          />
          <Heading
            title="Leave with Lasting Memories"
            description={`${place.checkOut.toString()}:00 h`}
          />
          <Heading
            title="Value for Your Experience"
            description={`${addComma(place.price)}, ${place.currency}`}
          />
          <Heading
            title="Perfect Group Getaway"
            description={`${place.maxGuests} people`}
          />
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
        </section>
      </div>
    </>
  );
}

export default PlaceInfo;
