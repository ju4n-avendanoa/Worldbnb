import { Perks, Photos, Place } from "@/interfaces/placeinterface";
import AddPlaceButton from "@/components/places/AddPlaceButton";
import UserPlaceBanner from "@/components/places/UserPlaceBanner";
import getPlacesByUserId from "@/actions/getPlacesByUserId";

async function UserPlaces({ userId }: { userId: string }) {
  const {
    places,
    perks,
    photos,
  }: {
    places: Place[];
    perks: Perks[];
    photos: Photos[];
  } = await getPlacesByUserId(userId);

  return (
    <section className="flex flex-col items-center w-full gap-6 px-6 py-6 text-sm md:px-12 lg:px-20 md:text-base">
      <h2 className="text-2xl font-bold lg:text-4xl">My Places</h2>
      <AddPlaceButton />
      {places?.length > 0 ? (
        places.map((place) => {
          const placePerks = perks.find((perk) => perk.placeId === place.id);
          const placePhotos = photos.filter(
            (photo) => photo.placeId === place.id
          );
          return (
            <div
              key={place.id}
              className="relative flex flex-col w-full gap-5 p-4 my-2 text-sm bg-gray-100 border shadow-lg md:flex-row rounded-xl lg:text-base shadow-gray-700 h-[600px] md:h-[300px] lg:h-[350px]"
            >
              <UserPlaceBanner
                place={place}
                perks={placePerks}
                photos={placePhotos}
              />
            </div>
          );
        })
      ) : (
        <h2 className="py-10 text-xl text-center lg:text-4xl">
          You don&apos;t have any places yet
        </h2>
      )}
    </section>
  );
}

export default UserPlaces;
