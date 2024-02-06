import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const photoId = await request.json();

    cloudinary.uploader
      .destroy(photoId, { invalidate: true })
      .then((result) => console.log(result));

    await prisma.photos.delete({
      where: {
        photoId,
      },
    });

    return NextResponse.json(" ");
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
