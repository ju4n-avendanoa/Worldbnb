import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import { EmailTemplate } from "../../../components/EmailTemplate";
import hashPassword from "@/utils/hashPassword";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      from: "Worldbnb <worldbnb@resend.dev>",
      to: newUser.email,
      subject: "Activate account",
      react: EmailTemplate({
        token: createToken.token,
        userId: createToken.userId,
      }) as React.ReactElement,
    });

    return NextResponse.json(newUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
