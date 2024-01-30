"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function AddPlaceButton() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/myAccount/${session?.user.id}/places/new`)}
    >
      add a new place
    </button>
  );
}

export default AddPlaceButton;
