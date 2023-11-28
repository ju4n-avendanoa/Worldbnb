import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import hashPassword from "@/app/utils/hashPassword";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const emailExists = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (emailExists)
      return NextResponse.json(
        { error: `User with the email ${data.email} already exists` },
        { status: 409 }
      );

    const passHashed = await hashPassword(data.password);
    const newUSer = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passHashed,
      },
    });
    return NextResponse.json(newUSer);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
