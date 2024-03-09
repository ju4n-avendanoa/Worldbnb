import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const places = await prisma.places.findMany({
      where: {
        userId: params.userId,
      },
      include: { photos: true, perks: true },
    });

    return NextResponse.json(places);
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const {
      title,
      address,
      description,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      photos,
      perks,
      price,
      country,
      currency,
    } = await request.json();

    const newPlace = await prisma.places.create({
      data: {
        userId: params.userId,
        title,
        address,
        description,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
        country,
        currency,
      },
    });

    for (const photoData of photos) {
      await prisma.photos.create({
        data: {
          photoId: photoData.photoId,
          url: photoData.url,
          placeId: newPlace.id,
        },
      });
    }

    await prisma.perks.create({
      data: {
        placeId: newPlace.id,
        wifi: perks.wifi,
        pet: perks.pet,
        parking: perks.parking,
        tv: perks.tv,
        privateEntrance: perks.privateEntrance,
        kitchen: perks.kitchen,
        washer: perks.washer,
        pool: perks.pool,
        airConditioner: perks.airConditioner,
        breakfast: perks.breakfast,
        gym: perks.gym,
        cleaningService: perks.cleaningService,
      },
    });

    return NextResponse.json("newPlace");
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
