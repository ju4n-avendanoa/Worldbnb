import { getListings } from "@/actions/getListings";
import ListingCard from "@/components/places/ListingCard";
import LoadMore from "@/components/LoadMore";

export default async function MainPage() {
  const data = await getListings(1);

  if (!data) {
    return (
      <div className="flex flex-col items-center gap-4 pt-20">
        <h2 className="text-2xl font-bold lg:text-4xl">
          There is no places to show
        </h2>
        <p>Try again later</p>
      </div>
    );
  }

  const { places, photos } = data;

  return (
    <main className="w-full min-h-screen ">
      <section
        className="grid grid-cols-1 gap-6 px-10 pt-10 pb-6 md:px-16 md:grid-cols-2 xl:grid-cols-4"
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
