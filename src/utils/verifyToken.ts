export async function tokenInfo(token: string, userId: string) {
  const baseURl =
    process.env.NODE_ENV === "production"
      ? "https://worldbnb.vercel.app"
      : "http://localhost:3000";

  const response = await fetch(
    `${baseURl}/api/verifyToken?token=${token}&userId=${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, userId }),
      cache: "no-cache",
    }
  );
  const data = await response.json();
  return data;
}
