import { EmailTemplate } from "@/components/EmailTemplate";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const prisma = new PrismaClient();

const baseUrl =
  process.env.NODE_ENV === "production"
    ? (process.env.VERCEL_URL as string)
    : (process.env.LOCAL_URL as string);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const user = searchParams.get("userId");

  if (!token || !user) {
    const relativePath = "/register";
    const fullUrl = new URL(relativePath, baseUrl);
    return NextResponse.redirect(fullUrl);
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      userId: user,
      token: token,
    },
  });

  if (!verificationToken) {
    const relativePath = "/verifyToken/unauthorized";
    const fullUrl = new URL(relativePath, baseUrl);
    return NextResponse.redirect(fullUrl);
  }

  if (
    new Date(Date.now()) > verificationToken.expire &&
    user === verificationToken.userId
  ) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const user = await prisma.user.findFirst({
      where: {
        id: verificationToken.userId,
      },
    });

    if (!user) return;

    const createToken = await prisma.verificationToken.update({
      where: {
        token: token,
      },
      data: {
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        activatedAt: new Date(Date.now()),
        expire: new Date(Date.now() + 86400000),
      },
    });

    await resend.emails.send({
      from: "Worldbnb <worldbnb@resend.dev>",
      to: user?.email as string,
      subject: "Activate account",
      react: EmailTemplate({
        token: createToken.token,
        userId: createToken.userId,
      }) as React.ReactElement,
    });

    const relativePath = "/verifyToken/resendToken";
    const fullUrl = new URL(relativePath, baseUrl);

    return NextResponse.redirect(fullUrl);
  }

  const relativePath = `myAccount/${user}`;
  const fullUrl = new URL(relativePath, baseUrl);
  return NextResponse.redirect(fullUrl);
}
