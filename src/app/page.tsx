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
    <main className="w-full min-h-screen ">
      <section
        className="grid grid-cols-1 gap-6 px-10 md:px-16 py-10 md:grid-cols-2 xl:grid-cols-4"
        style={{ gridAutoRows: "400px" }}
      >
        {places.map((place) => {
          const placePhotos = photos.find(
            (photo) => place.id === photo.placeId
          );
          return (
            <article key={place.id}>
              <ListingCard place={place} photos={placePhotos} />
            </article>
          );
        })}
      </section>
    </main>
  );
}
