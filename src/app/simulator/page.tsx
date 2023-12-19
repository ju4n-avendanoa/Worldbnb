import { getUserInfo } from "@/utils/getUserInfo";
import Link from "next/link";

async function page({ searchParams }: { searchParams: { email: string } }) {
  const user = await getUserInfo(searchParams.email);
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://lcoalhost:3000"
      : "https://worldbnb.vercel.app";

  return (
    <div>
      click{" "}
      <span>
        <Link
          href={`${baseUrl}/verifyToken?token=${user.token}&userId=${user.userId}`}
        >
          here
        </Link>
      </span>
    </div>
  );
}

export default page;
