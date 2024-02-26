"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Perks, Photos, Place } from "@/interfaces/placeinterface";
import { fallbackImage } from "@/utils/fallbackImage";
import { deletePlace } from "@/actions/deletePlace";
import { useRouter } from "next-nprogress-bar";
import { truePerks } from "@/utils/truePerks";
import { toast } from "sonner";
import ImageWithFallback from "../ImageWithFallback";
import PerksBanner from "./PerksBanner";

type Props = {
  place: Place;
  perks: Perks | undefined;
  photos: Photos[];
};

function UserPlaceBanner({ place, perks, photos }: Props) {
  const router = useRouter();

  let placePerks: string[] = [];
  if (perks) {
    placePerks = truePerks(perks);
  }

  return (
    <>
      <section className="absolute -top-4 right-2 md:top-2 md:right-2">
        <div className="flex gap-2">
          <div
            className="flex items-center h-8 gap-2 px-2 text-sm rounded-lg cursor-pointer justify-evenly bg-sky-500 w-min lg:w-20 hover:bg-sky-700"
            onClick={() =>
              router.push(`/myAccount/${place.userId}/places/edit/${place.id}`)
            }
          >
            <p className="text-white max-lg:hidden">edit</p>
            <PencilIcon color="white" className="w-4 h-auto" />
          </div>
          <div
            className="flex items-center h-8 gap-2 px-2 text-sm bg-red-500 rounded-lg cursor-pointer justify-evenly w-min lg:w-20 hover:bg-red-700"
            onClick={() => {
              toast.promise(deletePlace(place.id, photos), {
                loading: "Loading...",
                success: () => {
                  router.refresh();
                  return "Place deleted successfuly";
                },
                error: "Error deleting the place, please try again later",
              });
            }}
          >
            <p className="text-white max-lg:hidden">delete</p>
            <TrashIcon color="white" className="w-4 h-auto" />
          </div>
        </div>
      </section>
      <div className="w-full h-2/5 md:h-full md:w-1/3 max-md:pt-2">
        <ImageWithFallback
          src={photos[0].url}
          fallbackSrc={fallbackImage}
          alt="picture"
          height={1000}
          width={1000}
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>
      <div className="flex flex-col w-full h-full gap-2 md:w-2/3">
        <h4 className="font-bold">Title:</h4>
        <p className="line-clamp-1">{place.title}</p>
        <h4 className="font-bold">Address:</h4>
        <p className="line-clamp-1">{place.address}</p>
        <h4 className="font-bold">Description:</h4>
        <p className="whitespace-pre-line line-clamp-3">{place.description}</p>
        <h4 className="font-bold">Perks:</h4>
        <div className="flex flex-wrap w-full gap-2 ">
          {placePerks.length === 0 ? (
            <p>No perks added</p>
          ) : (
            placePerks.map((perk, index) => (
              <div key={index}>
                <PerksBanner perk={perk} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default UserPlaceBanner;
