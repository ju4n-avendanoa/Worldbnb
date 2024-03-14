import { getUserReservations } from "@/actions/getUserReservations";
import UserReservationBanner from "@/components/places/UserReservationBanner";
import Link from "next/link";

async function Trips() {
  const reservations = await getUserReservations();

  if (!reservations || reservations.length === 0) {
    return (
      <div className="flex-col items-center flex gap-8 pt-20">
        <h2 className="text-2xl lg:text-4xl font-semibold">
          You don&apos;t have any reservations yet
        </h2>
        <p>
          Reserve the place of your dreams{" "}
          <Link
            href={"/"}
            className="text-sky-700 underline-offset-2 underline font-semibold"
          >
            here
          </Link>
        </p>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center h-full gap-10 px-6 py-6 md:px-12 lg:px-20">
      <h2 className="text-2xl font-bold lg:text-4xl">My Trips</h2>
      {reservations?.map((reservation) => (
        <div
          className="relative flex flex-col w-full gap-5 p-4 my-2 text-sm bg-gray-100 border shadow-lg md:flex-row rounded-xl lg:text-base shadow-gray-700 h-[600px] md:h-[340px] lg:h-[400px]"
          key={reservation.id}
        >
          <UserReservationBanner
            place={reservation.listing}
            photo={reservation.listing.photos}
            reservation={reservation}
          />
        </div>
      ))}
    </section>
  );
}

export default Trips;
