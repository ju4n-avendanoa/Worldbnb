import { Suspense } from "react";
import Homes from "./Homes";
import LoadingMainPage from "@/components/LoadingMainPage";

export type ParamsProps = {
  searchParams: {
    country: string;
    startDate: string;
    endDate: string;
    guests: number;
  };
};

function HomePage({ searchParams }: ParamsProps) {
  const country = searchParams.country || "";
  const startDate = searchParams.startDate;
  const endDate = searchParams.endDate;
  const guests = Number(searchParams.guests);
  return (
    <main className="w-full min-h-screen ">
      <Suspense fallback={<LoadingMainPage />}>
        <Homes
          country={country}
          startDate={startDate}
          endDate={endDate}
          guests={guests}
        />
      </Suspense>
    </main>
  );
}

export default HomePage;
