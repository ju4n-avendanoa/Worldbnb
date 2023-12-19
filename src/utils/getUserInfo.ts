import { DbToken } from "@/interfaces/registerInterfaces";

export async function getUserInfo(email: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://lcoalhost:3000"
      : "https://worldbnb.vercel.app";
  const response = await fetch(`${baseUrl}/api/verifyToken?email=${email}`);
  const data: DbToken = await response.json();
  console.log(data);
  return data;
}
