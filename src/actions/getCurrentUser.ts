"use server";

import { config } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export default async function getUser() {
  const session = await getServerSession(config);
  return session?.user;
}
