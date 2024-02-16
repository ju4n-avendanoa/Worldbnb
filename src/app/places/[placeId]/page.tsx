import { getPlaceById } from "@/actions/getPlaceById";
import PlaceInfo from "./PlaceInfo";

async function PlacePage({ params }: { params: { placeId: string } }) {
  const response = await getPlaceById(params.placeId);

  if (!response) {
    return <div>There was an error</div>;
  }

  const { place, perks, photos } = response;

  return (
    <div>
      <PlaceInfo place={place} perks={perks} photos={photos} />
    </div>
  );
}

export default PlacePage;
