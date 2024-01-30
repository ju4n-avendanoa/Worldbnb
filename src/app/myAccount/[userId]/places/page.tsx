import AddPlaceButton from "@/components/AddPlaceButton";
import PlaceBanner from "@/components/PlaceBanner";
import { Perks, Place } from "@/interfaces/placeinterface";
import getPlaces from "@/utils/getPlaces";
import React from "react";

async function MyPlaces({ params }: { params: { userId: string } }) {
  const {
    places,
    perks,
  }: {
    places: Place[];
    perks: Perks[];
  } = await getPlaces(params.userId);

  // console.log(places, perks);

  return (
    <div>
      <AddPlaceButton />
      <div className="flex flex-col gap-4 p-6">
        {places.map((place) => {
          const placePerks = perks.find((perk) => perk.placeId === place.id);
          console.log(placePerks);
          return (
            <div key={place.id}>
              <PlaceBanner place={place} perks={placePerks!} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyPlaces;
