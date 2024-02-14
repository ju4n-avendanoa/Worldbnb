import ImageWithFallback from "@/components/ImageWithFallback";
import ListingCard from "@/components/places/ListingCard";
import { Perks, Photos, Place } from "@/interfaces/placeinterface";
import { fallbackImage } from "@/utils/fallbackImage";
import { getListings } from "@/actions/getListings";

export default async function Home() {
  const {
    places,
    perks,
    photos,
  }: { places: Place[]; perks: Perks[]; photos: Photos[] } =
    await getListings();

  if (places.length === 0) {
    return <div>There is no places to show</div>;
  }

  return (
    <main className=" min-h-screen w-full ">
      <section
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 py-10 px-16 gap-6"
        style={{ gridAutoRows: "450px" }}
      >
        {places.map((place) => {
          const placePhotos = photos.find(
            (photo) => place.id === photo.placeId
          );
          return <ListingCard place={place} photos={placePhotos} />;
        })}
      </section>
    </main>
  );
}
