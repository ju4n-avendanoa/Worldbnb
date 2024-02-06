import AddPlaceButton from "@/components/AddPlaceButton";
import PlaceBanner from "@/components/PlaceBanner";
import { Perks, Photos, Place } from "@/interfaces/placeinterface";
import getPlaces from "@/utils/getPlaces";
import React from "react";

async function Places({ userId }: { userId: string }) {
  const {
    places,
    perks,
    photos,
  }: {
    places: Place[];
    perks: Perks[];
    photos: Photos[];
  } = await getPlaces(userId);

  return (
    <section className="flex flex-col items-center w-full gap-6 p-6 text-sm md:text-base">
      <AddPlaceButton />
      {places.length > 0 ? (
        places.map((place) => {
          const placePerks = perks.find((perk) => perk.placeId === place.id);
          const placePhotos = photos.filter(
            (photo) => photo.placeId === place.id
          );
          return (
            <div
              key={place.id}
              className="relative flex flex-col md:flex-row gap-5 p-4 bg-gray-100 border border-gray-400 rounded-xl h-min w-full lg:text-base text-sm"
            >
              <PlaceBanner
                place={place}
                perks={placePerks}
                photos={placePhotos}
              />
            </div>
          );
        })
      ) : (
        <h2 className="text-6xl">You don&apos;t have any places yet</h2>
      )}
    </section>
  );
}

export default Places;
