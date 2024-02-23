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
  const availablePlaces: { place: Place; photos: Photos[] }[] =
    await getReservations(
      {
        country,
        startDate,
        endDate,
        guests,
      },
      1
    );

  if (availablePlaces.length === 0) {
    return <div>There is no places to show</div>;
  }

  return (
    <>
      <section
        className="grid grid-cols-1 gap-6 px-10 md:px-16 py-10 md:grid-cols-2 xl:grid-cols-4"
        style={{ gridAutoRows: "400px" }}
      >
        {availablePlaces.map((place) => {
          const placePhotos = place.photos.find(
            (photo: any) => place.place.id === photo.placeId
          );
          return (
            <article key={place.place.id}>
              <ListingCard place={place.place} photos={placePhotos} />
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
