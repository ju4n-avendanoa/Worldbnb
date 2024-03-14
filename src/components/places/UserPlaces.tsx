import AddPlaceButton from "@/components/places/AddPlaceButton";
import UserPlaceBanner from "@/components/places/UserPlaceBanner";
import getPlacesByUserId from "@/actions/getPlacesByUserId";

async function UserPlaces() {
  const places = await getPlacesByUserId();

  if (!places || places.length === 0) {
    return (
      <div className="flex-col items-center flex gap-8 pt-20">
        <h2 className="text-2xl text-center lg:text-4xl font-semibold">
          You don&apos;t have any places yet
        </h2>
        <AddPlaceButton />
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center w-full gap-6 px-6 py-6 text-sm md:px-12 lg:px-20 md:text-base">
      <h2 className="text-2xl font-bold lg:text-4xl">My Places</h2>
      <AddPlaceButton />
      {places.map((place) => {
        return (
          <div
            key={place.id}
            className="relative flex flex-col w-full gap-5 p-4 my-2 text-sm bg-gray-100 border shadow-lg md:flex-row rounded-xl lg:text-base shadow-gray-700 h-[600px] md:h-[300px] lg:h-[350px]"
          >
            <UserPlaceBanner place={place} />
          </div>
        );
      })}
    </section>
  );
}

export default UserPlaces;
