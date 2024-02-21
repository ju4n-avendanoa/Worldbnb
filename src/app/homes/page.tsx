import { getReservations } from "@/actions/getReservations";
import { Photos, Place } from "@/interfaces/placeinterface";
import { Suspense } from "react";
import LoadingCard from "@/components/LoadingCard";
import ListingCard from "@/components/places/ListingCard";
import Loading from "../loading";

export type ParamsProps = {
  searchParams: {
    country: string;
    startDate: string;
    endDate: string;
    guests: number;
  };
};

async function Homes({ searchParams }: ParamsProps) {
  const country = searchParams.country || "";
  const startDate = searchParams.startDate;
  const endDate = searchParams.endDate;
  const guests = Number(searchParams.guests);

  const availablePlaces: { place: Place; photos: Photos[] }[] =
    await getReservations({
      country,
      startDate,
      endDate,
      guests,
    });

  return (
    <section
      className="grid grid-cols-1 gap-6 px-10 md:px-16 py-10 md:grid-cols-2 xl:grid-cols-4"
      style={{ gridAutoRows: "400px" }}
    >
      <Suspense fallback={<LoadingCard />}>
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
      </Suspense>
    </section>
  );
}

export default Homes;
