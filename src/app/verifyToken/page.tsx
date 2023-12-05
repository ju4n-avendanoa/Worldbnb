import { Suspense } from "react";
import VerifyingCard from "@/components/VerifyingCard";

async function VerifyToken({
  searchParams,
}: {
  searchParams: { userId: string; token: string };
}) {
  return (
    <main className="flex justify-center">
      <div className="border border-black bg-blue-200 rounded-md w-1/5">
        <h2 className="text-center bg-blue-950 text-white p-4">
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
