import { getPlaceById } from "@/actions/getPlaceById";
import PlaceInfo from "./PlaceInfo";
import getCurrentUser from "@/actions/getCurrentUser";
import { getReservationsByPlaceid } from "@/actions/getReservationsById";

export const revalidate = 0;

async function PlacePage({ params }: { params: { placeId: string } }) {
  const response = await getPlaceById(params.placeId);
  const session = await getCurrentUser();
  const reservations = await getReservationsByPlaceid(params.placeId);

  if (!response) {
    return (
      <div className="flex justify-center text-4xl pt-20 font-semibold">
        <h2>This place does not exist</h2>
      </div>
    );
  }

  const { place, perks, photos } = response;

  return (
    <div>
      <PlaceInfo
        place={place}
        perks={perks}
        photos={photos}
        currentUser={session}
        reservations={reservations}
      />
    </div>
  );
}

export default PlacePage;
