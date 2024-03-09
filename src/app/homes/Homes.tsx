import { getReservations } from "@/actions/getReservations";
import { Photos, Place } from "@/interfaces/placeinterface";
import LoadMoreFilters from "@/components/LoadMoreFilters";
import ListingCard from "@/components/places/ListingCard";

export type ParamsProps = {
  country: string;
  startDate: string;
  endDate: string;
  guests: number;
};

async function Homes({ country, startDate, endDate, guests }: ParamsProps) {
  const places = await getReservations(
    {
      country,
      startDate,
      endDate,
      guests,
    },
    1
  );

  if (!places || places.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 pt-20">
        <h2 className="text-2xl font-bold lg:text-4xl">
          There are no places to show
        </h2>
        <p>Try using different filters</p>
      </div>
    );
  }

  return (
    <>
      <section
        className="grid grid-cols-1 gap-6 px-10 py-10 md:px-16 md:grid-cols-2 xl:grid-cols-4"
        style={{ gridAutoRows: "400px" }}
      >
        {places?.map((place) => {
          return (
            <article key={place.id}>
              <ListingCard place={place} />
            </article>
          );
        })}
      </section>
      <LoadMoreFilters
        country={country}
        startDate={startDate}
        endDate={endDate}
        guests={guests}
      />
    </>
  );
}

export default Homes;
