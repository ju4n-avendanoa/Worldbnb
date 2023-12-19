import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Invalid email" }, { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "No User Found" }, { status: 401 });
    }

    const tokenInfo = await prisma.verificationToken.findFirst({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(tokenInfo);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");

    if (
      token === "undefined" ||
      userId === "undefined" ||
      userId === "" ||
      token === ""
    ) {
      return NextResponse.json(
        { error: "Token and userId are required" },
        { status: 400 }
      );
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        userId: userId as string,
        token: token as string,
      },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { error: "Invalid token or userId" },
        { status: 401 }
      );
    }

    if (
      new Date(Date.now()) > verificationToken.expire &&
      userId === verificationToken.userId
    ) {
      const user = await prisma.user.findFirst({
        where: {
          id: verificationToken.userId,
        },
      });

      if (!user) return;

      const createToken = await prisma.verificationToken.update({
        where: {
          token: token as string,
        },
        data: {
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
          activatedAt: new Date(Date.now()),
          expire: new Date(Date.now() + 86400000),
        },
      });

      return NextResponse.json({ message: "Token resent successfully" });
    }

    await prisma.user.update({
      where: {
        id: userId as string,
      },
      data: {
        emailVerified: true,
      },
    });

    return NextResponse.json({ message: "Email verified" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
