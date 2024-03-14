import { getUserReservations } from "@/actions/getUserReservations";
import { Suspense } from "react";
import LoadingCard from "@/components/loading/LoadingCard";
import Trips from "./Trips";

export const revalidate = 0;

async function TripsPage() {
  return (
    <Suspense fallback={<LoadingCard />}>
      <Trips />
    </Suspense>
  );
}

export default TripsPage;
