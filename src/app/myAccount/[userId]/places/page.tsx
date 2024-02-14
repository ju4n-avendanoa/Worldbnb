import { Suspense } from "react";
import LoadingCard from "@/components/LoadingCard";
import Places from "@/components/places/Places";

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
