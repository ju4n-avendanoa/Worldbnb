import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import hashPassword from "@/utils/hashPassword";

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
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passHashed,
      },
    });

    const createToken = await prisma.verificationToken.create({
      data: {
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        activatedAt: new Date(Date.now()),
        expire: new Date(Date.now() + 86400000),
        userId: newUser.id,
      },
    });

    return NextResponse.json(newUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
