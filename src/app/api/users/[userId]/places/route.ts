import { Place } from "@/interfaces/placeinterface";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  console.log(params.userId);
  const places = await prisma.places.findMany({
    where: {
      userId: params.userId,
    },
  });

  const idPlaces = places.map((place: Place) => place.id);

  const perks = await prisma.perks.findMany({
    where: {
      placeId: {
        in: idPlaces,
      },
    },
  });
  return NextResponse.json({ places, perks });
}

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
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
  } = await request.json();
  console.log(photos);
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
      photos,
    },
  });

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
}
