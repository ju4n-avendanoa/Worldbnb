import { getListings } from "@/actions/getListings";
import ListingCard from "@/components/places/ListingCard";
import LoadMore from "@/components/LoadMore";

export default async function MainPage() {
  const places = await getListings(1);

  if (!places || places.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 pt-20">
        <h2 className="text-2xl font-bold lg:text-4xl">
          There are no places to show
        </h2>
        <p>Try again later</p>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen ">
      <section
        className="grid grid-cols-1 gap-6 px-10 pt-10 pb-6 md:px-16 md:grid-cols-2 xl:grid-cols-4"
        style={{ gridAutoRows: "400px" }}
      >
        {places.map((place) => {
          return (
            <article key={place.id}>
              <ListingCard place={place} />
            </article>
          );
        })}
      </section>
      <LoadMore />
    </main>
  );
}
