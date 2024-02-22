import { getListings } from "@/actions/getListings";
import ListingCard from "@/components/places/ListingCard";
import LoadMore from "@/components/LoadMore";

export default async function Home() {
  const { places, photos } = await getListings(1);

  if (places.length === 0) {
    return <div>There is no places to show</div>;
  }

  return (
    <main className="w-full min-h-screen ">
      <section
        className="grid grid-cols-1 gap-6 px-10 md:px-16 pt-10 pb-6 md:grid-cols-2 xl:grid-cols-4"
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
      <LoadMore />
    </main>
  );
}
