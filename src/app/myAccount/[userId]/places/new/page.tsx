import PlaceForm from "@/components/PlaceForm";

export const revalidate = 0;

function NewPlace({ params }: { params: { placeId: string; userId: string } }) {
  return (
    <div>
      <PlaceForm placeId={params.placeId} userId={params.userId} />
    </div>
  );
}

export default NewPlace;
