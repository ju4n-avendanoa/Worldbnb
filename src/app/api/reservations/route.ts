import { capitalize } from "@/utils/capitalize";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const guests = Number(searchParams.get("guests"));
    const page = Number(searchParams.get("page"));
    const pageSize = 8;
    const offset = (page - 1) * pageSize;

    let query: any = {};

    if (country) {
      const capitalizedCountry = capitalize(country);
      query.country = {
        contains: capitalizedCountry,
      };
    }

    if (guests) {
      query.maxGuests = {
        gte: +guests,
      };
    }

    if (startDate && endDate) {
      const parseStartDate = new Date(startDate);
      const parseEndDate = new Date(endDate);
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: parseStartDate },
                startDate: { lte: parseStartDate },
              },
              {
                startDate: { lte: parseEndDate },
                endDate: { gte: parseEndDate },
              },
            ],
          },
        },
      };
    }

    const places = await prisma.places.findMany({
      where: query,
      take: pageSize,
      skip: offset,
    });

    const idPlaces = places.map((place) => place.id);

    const photos = await prisma.photos.findMany({
      where: {
        placeId: { in: idPlaces },
      },
    });

    const availablePlaces = places.map((place) => {
      const placePhotos = photos.filter((photo) => photo.placeId === place.id);
      return { place, photos: placePhotos };
    });

    return NextResponse.json(availablePlaces);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
