import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { omit } from "lodash";
import { Photos } from "@/interfaces/placeinterface";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

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

    const photos = await prisma.photos.findMany({
      where: {
        placeId: place.id,
      },
    });

    const filteredPhotos = photos.map((photo: Photos) =>
      omit(photo, ["placeId"])
    );

    const filteredPlace = omit(place, ["id", "userId"]);
    const filteredPerks = omit(perks, ["id", "placeId"]);
    return NextResponse.json({ filteredPlace, filteredPerks, filteredPhotos });
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
      perks,
    } = await request.json();

    await prisma.places.update({
      where: { id: params.placeId },
      data: {
        title,
        address,
        description,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
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

export async function DELETE(
  request: Request,
  { params }: { params: { placeId: string } }
) {
  try {
    const photos: Photos[] = await request.json();
    await prisma.places.delete({
      where: { id: params.placeId },
    });

    photos.map((photo) =>
      cloudinary.uploader
        .destroy(photo.photoId, { invalidate: true })
        .then((result) => console.log(result))
    );

    return NextResponse.json("deleted");
  } catch (error) {
    return NextResponse.json(error);
  }
}
