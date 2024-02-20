import { getReservations } from "@/actions/getReservations";
import React, { useMemo } from "react";

type ParamsProps = {
  searchParams: {
    country: string;
    startDate: string;
    endtDate: string;
    guests: string;
  };
};

async function Homes({ searchParams }: ParamsProps) {
  console.log(searchParams);

  const reservations = await getReservations();
  console.log(reservations);

  return <div>Homes</div>;
}

export default Homes;
