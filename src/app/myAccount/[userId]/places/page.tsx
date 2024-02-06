import Loading from "@/app/loading";
import LoadingCard from "@/components/LoadingCard";
import Places from "@/components/Places";
import React, { Suspense } from "react";

export const revalidate = 0;

function UserPlaces({ params }: { params: { userId: string } }) {
  return (
    <>
      <Suspense fallback={<LoadingCard />}>
        <Places userId={params.userId} />
      </Suspense>
    </>
  );
}

export default UserPlaces;
