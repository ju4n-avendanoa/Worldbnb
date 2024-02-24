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
    <section className="flex flex-col items-center w-full gap-6 py-6 px-6 md:px-12 lg:px-20 text-sm md:text-base">
      <h2 className="text-2xl lg:text-4xl font-bold">My Places</h2>
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
        <h2 className="text-xl lg:text-4xl text-center py-10">
          You don&apos;t have any places yet
        </h2>
      )}
    </section>
  );
}

export default UserPlaces;
