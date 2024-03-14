import { Suspense } from "react";
import LoadingCard from "@/components/loading/LoadingCard";
import UserPlaces from "@/components/places/UserPlaces";

export const revalidate = 0;

function UserPlacesPage() {
  return (
    <>
      <Suspense fallback={<LoadingCard />}>
        <UserPlaces />
      </Suspense>
    </>
  );
}

export default UserPlacesPage;
