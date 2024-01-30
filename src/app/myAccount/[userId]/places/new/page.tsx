import PlaceForm from "@/components/PlaceForm";
import React from "react";

function NewPlace({ params }: { params: { placeId: string; userId: string } }) {
  return (
    <div>
      <PlaceForm placeId={params.placeId} userId={params.userId} />
    </div>
  );
}

export default NewPlace;
