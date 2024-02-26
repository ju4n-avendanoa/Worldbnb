import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page"));
    const pageSize = 8;
    const offset = (page - 1) * pageSize;

    const places = await prisma.places.findMany({
      take: pageSize,
      skip: offset,
    });

    const idPlaces = places.map((place) => place.id);

    // const perks = await prisma.perks.findMany({
    //   where: {
    //     placeId: { in: idPlaces },
    //   },
    // });

    const photos = await prisma.photos.findMany({
      where: {
        placeId: { in: idPlaces },
      },
    });

    return NextResponse.json({ places, photos });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
