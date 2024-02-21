import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { placeId: string } }
) {
  try {
    if (!params.placeId) {
      return NextResponse.json(
        { message: "Could not find place" },
        { status: 404 }
      );
    }
    const reservation = await prisma.reservation.findMany({
      where: {
        placeId: params.placeId,
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
