import { getReservations } from "@/actions/getReservations";
import React, { useMemo } from "react";

export type ParamsProps = {
  searchParams: {
    country: string;
    startDate: string;
    endDate: string;
    guests: number;
  };
};

async function Homes({ searchParams }: ParamsProps) {
  console.log(searchParams);
  const country = searchParams.country || "";
  const startDate = searchParams.startDate;
  const endDate = searchParams.endDate;
  const guests = Number(searchParams.guests);

  const reservations = await getReservations({
    country,
    startDate,
    endDate,
    guests,
  });

  return <div>Homes</div>;
}

export default Homes;
