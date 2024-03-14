import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const reservations = await prisma.reservation.findMany({
      where: { userId: params.userId },
      include: {
        listing: {
          include: { photos: true },
        },
      },
    });

    return NextResponse.json(reservations);
  } catch (error: any) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
