import { getUserReservations } from "@/actions/getUserReservations";
import UserReservationBanner from "@/components/UserReservationBanner";

async function page({ params }: { params: { userId: string } }) {
  const data = await getUserReservations(params.userId);

  if (data?.length === 0) {
    return (
      <div className="flex justify-center pt-20">
        <h2 className="font-semibold text-4xl">
          You don't have any reservations yet
        </h2>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center py-6 px-6 md:px-12 lg:px-20 gap-10 h-full">
      <h2 className="font-bold text-4xl">My Trips</h2>
      {data?.map((element) => (
        <div
          className="relative flex flex-col w-full gap-5 p-4 my-2 text-sm bg-gray-100 border shadow-lg md:flex-row rounded-xl lg:text-base shadow-gray-700 h-[600px] md:h-[340px] lg:h-[400px]"
          key={element.place.id}
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

export default page;
