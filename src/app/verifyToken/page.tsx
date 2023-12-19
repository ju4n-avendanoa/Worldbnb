import { Suspense } from "react";
import VerifyingCard from "@/components/VerifyingCard";

async function VerifyToken({
  searchParams,
}: {
  searchParams: { userId: string; token: string };
}) {
  return (
    <main className="flex justify-center">
      <div className="w-1/5 bg-blue-200 border border-black rounded-md">
        <h2 className="p-4 text-center text-white bg-blue-950">
          We are processing your request
        </h2>
        <Suspense fallback={<p>...Loading</p>}>
          <VerifyingCard
            token={searchParams.token}
            userId={searchParams.userId}
          />
        </Suspense>
      </div>
    </main>
  );
}

export default VerifyToken;
