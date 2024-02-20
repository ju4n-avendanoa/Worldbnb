import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const placeId = searchParams.get("placeId");

    if (!placeId) {
      const reservations = await prisma.reservation.findMany();

      return NextResponse.json(reservations);
    }
    const reservation = await prisma.reservation.findMany({
      where: {
        placeId: placeId,
      },
    });

    return NextResponse.json(reservation);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { totalPrice, startDate, endDate, placeId, userId } =
      await request.json();

    console.log({ totalPrice, startDate, endDate, placeId, userId });

    const newReservation = await prisma.reservation.create({
      data: {
        totalPrice,
        startDate,
        endDate,
        placeId,
        userId,
      },
    });

    return NextResponse.json("Reservation created successfully");
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
