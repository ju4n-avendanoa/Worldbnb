import { getUserReservations } from "@/actions/getUserReservations";
import { Suspense } from "react";
import LoadingCard from "@/components/loading/LoadingCard";
import Trips from "./Trips";

export const revalidate = 0;

async function TripsPage({ params }: { params: { userId: string } }) {
  const data = await getUserReservations(params.userId);

  if (data?.length === 0) {
    return (
      <div className="pt-20">
        <h2 className="text-xl font-semibold text-center lg:text-4xl">
          You don&apos;t have any reservations yet
        </h2>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingCard />}>
      <Trips userId={params.userId} />
    </Suspense>
  );
}

export default TripsPage;
