import { getUserReservations } from "@/actions/getUserReservations";
import UserReservationBanner from "@/components/places/UserReservationBanner";

async function Trips({ userId }: { userId: string }) {
  const data = await getUserReservations(userId);

  return (
    <section className="flex flex-col items-center h-full gap-10 px-6 py-6 md:px-12 lg:px-20">
      <h2 className="text-2xl font-bold lg:text-4xl">My Trips</h2>
      {data?.map((element) => (
        <div
          className="relative flex flex-col w-full gap-5 p-4 my-2 text-sm bg-gray-100 border shadow-lg md:flex-row rounded-xl lg:text-base shadow-gray-700 h-[600px] md:h-[340px] lg:h-[400px]"
          key={element.reservation.id}
        >
          <UserReservationBanner
            place={element.place}
            photo={element.photo}
            reservation={element.reservation}
          />
        </div>
      ))}
    </section>
  );
}

export default Trips;
