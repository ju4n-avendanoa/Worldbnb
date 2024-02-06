"use client";

import { Perks, Photos, Place } from "@/interfaces/placeinterface";
import { perksLogos } from "@/utils/perksLogos";
import { useRouter } from "next-nprogress-bar";
import ImageWithFallback from "./ImageWithFallback";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deletePlace } from "@/utils/deletePlace";

type Props = {
  place: Place;
  perks: Perks | undefined;
  photos: Photos[];
};

function PlaceBanner({ place, perks, photos }: Props) {
  const router = useRouter();

  //Perks marked as true

  let truePerks: string[] = [];
  if (perks) {
    truePerks = Object.entries(perks)
      .filter(
        ([key, value]) => key !== "id" && key !== "placeId" && value === true
      )
      .map(([key]) => key);
  }

  return (
    <>
      <section className="absolute -top-4 right-2 md:top-2 md:right-2">
        <div className="flex gap-2">
          <div
            className="flex gap-2 px-2 justify-evenly bg-sky-500 w-min lg:w-20 h-8 text-sm rounded-lg items-center cursor-pointer hover:bg-sky-700"
            onClick={() =>
              router.push(`/myAccount/${place.userId}/places/edit/${place.id}`)
            }
          >
            <p className="text-white max-lg:hidden">edit</p>
            <PencilIcon color="white" className="w-4 h-auto" />
          </div>
          <div
            className="flex items-center px-2 justify-evenly gap-2 bg-red-500 w-min lg:w-20 h-8 text-sm rounded-lg cursor-pointer hover:bg-red-700"
            onClick={() => {
              deletePlace(place.id, photos);
              router.refresh();
            }}
          >
            <p className="text-white max-lg:hidden">delete</p>
            <TrashIcon color="white" className="w-4 h-auto" />
          </div>
        </div>
      </section>
      <div className="w-full md:w-1/3 max-md:pt-2">
        <ImageWithFallback
          src={photos[0].url}
          fallbackSrc={perksLogos.default.link}
          alt="picture"
          height={1000}
          width={1000}
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>
      <div className="flex flex-col w-full gap-2 md:w-2/3">
        <h4 className="font-bold">Title:</h4>
        <p>{place.title}</p>
        <h4 className="font-bold">Address:</h4>
        <p>{place.address}</p>
        <h4 className="font-bold">Description:</h4>
        <p className="whitespace-pre-line">{place.description}</p>
        <h4 className="font-bold">Perks:</h4>
        <div className="flex w-full gap-2 ">
          {truePerks.map((perk, index) => (
            <div
              className="flex items-center justify-center border-2 rounded-lg border-sky-700 bg-sky-50 w-7 h-7 lg:w-10 lg:h-10"
              key={index}
            >
              <ImageWithFallback
                src={perksLogos[perk].link}
                fallbackSrc={perksLogos.default.link}
                alt={perk}
                height={50}
                width={50}
                className="w-4 h-auto lg:w-7"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlaceBanner;
