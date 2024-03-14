import { getReservationsByPlaceid } from "@/actions/getReservationsByPlaceId";
import { getPlaceById } from "@/actions/getPlaceById";
import PlaceInfo from "./PlaceInfo";
import getUser from "@/actions/getCurrentUser";

export const revalidate = 0;

async function PlacePage({ params }: { params: { placeId: string } }) {
  const place = await getPlaceById(params.placeId);
  const session = await getUser();
  const reservations = await getReservationsByPlaceid(params.placeId);

  if (!place) {
    return (
      <div className="flex justify-center pt-20 text-4xl font-semibold">
        <h2>This place does not exist</h2>
      </div>
    );
  }

  return (
    <div>
      <PlaceInfo
        place={place}
        currentUser={session}
        reservations={reservations}
      />
    </div>
  );
}

export default PlacePage;
