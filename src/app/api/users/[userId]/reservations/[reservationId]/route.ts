import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { reservationId: string } }
) {
  try {
    await prisma.reservation.delete({
      where: {
        id: params.reservationId,
      },
    });
    return NextResponse.json("Place deleted successfully");
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
