import { Suspense } from "react";
import LoadingCard from "@/components/LoadingCard";
import UserPlaces from "@/components/places/UserPlaces";

export const revalidate = 0;

function UserPlacesPage({ params }: { params: { userId: string } }) {
  return (
    <>
      <Suspense fallback={<LoadingCard />}>
        <UserPlaces userId={params.userId} />
      </Suspense>
    </>
  );
}

export default UserPlacesPage;
