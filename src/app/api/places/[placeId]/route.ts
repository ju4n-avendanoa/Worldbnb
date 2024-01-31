import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { omit } from "lodash";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { placeId: string } }
) {
  try {
    const place = await prisma.places.findFirst({
      where: { id: params.placeId },
    });

    if (!place) {
      return NextResponse.json("no found");
    }

    const perks = await prisma.perks.findFirst({
      where: {
        placeId: place.id,
      },
    });
    const filteredPlace = omit(place, ["id", "userId"]);
    const filteredPerks = omit(perks, ["id", "placeId"]);

    return NextResponse.json({ filteredPlace, filteredPerks });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { placeId: string } }
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
    } = await request.json();

    const updatedPlace = await prisma.places.update({
      where: { id: params.placeId },
      data: {
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

    await prisma.perks.update({
      where: { placeId: params.placeId },
      data: {
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

    return NextResponse.json("success");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
