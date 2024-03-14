import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import hashPassword from "@/utils/hashPassword";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          error: `User with the email ${data.email} already exists`,
          email: user.email,
          emailVerified: true,
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(data.password);

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error, please try again later" },
      { status: 500 }
    );
  }
}
