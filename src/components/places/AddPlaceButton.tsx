"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";

function AddPlaceButton() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/myAccount/${session?.user.id}/places/new`)}
      className="flex items-center justify-around gap-2 px-4 py-2 text-white transition duration-300 ease-in-out delay-150 rounded-lg bg-sky-600 hover:bg-sky-500 hover:-translate-y-1 hover:scale-110 shadow-lg shadow-gray-700"
    >
      <span>add a new place</span>
      <span>
        <PlusCircleIcon className="w-6" />
      </span>
    </button>
  );
}

export default AddPlaceButton;
