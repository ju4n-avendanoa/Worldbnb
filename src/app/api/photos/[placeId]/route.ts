import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { placeId: string } }
) {
  const { photosUrl } = await request.json();
  for (const photoData of photosUrl) {
    await prisma.photos.create({
      data: {
        photoId: photoData.photoId,
        url: photoData.url,
        placeId: params.placeId,
      },
    });
  }

  return NextResponse.json("");
}
