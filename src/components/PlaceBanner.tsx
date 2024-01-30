"use client";

import { Perks, Place } from "@/interfaces/placeinterface";
import { perksLogos } from "@/utils/perksLogos";
import { useRouter } from "next/navigation";
import ImageWithFallback from "./ImageWithFallback";

type Props = {
  place: Place;
  perks: Perks;
};

function PlaceBanner({ place, perks }: Props) {
  const router = useRouter();

  const truePerks = Object.entries(perks)
    .filter(
      ([key, value]) => key !== "id" && key !== "placeId" && value === true
    )
    .map(([key]) => key);

  return (
    <section
      className="border border-gray-400 rounded-xl"
      onClick={() =>
        router.push(`/myAccount/${place.userId}/places/edit/${place.id}`)
      }
    >
      <div className="flex flex-col w-1/2 gap-2 p-4">
        <h4 className="font-bold">Title:</h4>
        <p>{place.title}</p>
        <h4 className="font-bold">Address:</h4>
        <p>{place.address}</p>
        <h4 className="font-bold">Description:</h4>
        <p>{place.description}</p>
        <h4 className="font-bold">Extra info:</h4>
        <p className=" whitespace-pre-line">{place.extraInfo}</p>
        <h4 className="font-bold">Check-in:</h4>
        <p>{place.checkIn}</p>
        <h4 className="font-bold">Check-out:</h4>
        <p>{place.checkOut}</p>
        <h4 className="font-bold">Number of guests:</h4>
        <p>{place.maxGuests}</p>
        <h4 className="font-bold">Perks:</h4>
        <div className="flex gap-4">
          {truePerks.map((perk, index) => (
            <div
              className="flex items-center justify-around gap-2 p-3 border-2 rounded-lg border-sky-700 bg-sky-50"
              key={index}
            >
              <ImageWithFallback
                src={perksLogos[perk].link}
                fallbackSrc={perksLogos.default.link}
                alt={perk}
                height={20}
                width={20}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlaceBanner;
