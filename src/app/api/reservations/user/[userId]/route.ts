import { Places, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        userId: params.userId,
      },
      orderBy: {
        startDate: "asc",
      },
    });

    const resultArray = await Promise.all(
      reservations.map(async (reservation) => {
        const place = await prisma.places.findUnique({
          where: { id: reservation.placeId },
        });

        const photo = await prisma.photos.findFirst({
          where: { placeId: reservation.placeId },
        });

        return {
          reservation,
          place,
          photo,
        };
      })
    );

    return NextResponse.json(resultArray);
  } catch (error: any) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
