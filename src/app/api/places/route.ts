import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const places = await prisma.places.findMany();
    const perks = await prisma.perks.findMany();
    const photos = await prisma.photos.findMany();
    return NextResponse.json({ places, perks, photos });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
