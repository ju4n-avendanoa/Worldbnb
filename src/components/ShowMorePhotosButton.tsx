import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

type Props = {};

function ShowMorePhotosButton({
  setShowCarousel,
}: {
  setShowCarousel: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => setShowCarousel(true)}
      className="flex items-center gap-2 p-2 transition duration-150 border border-black rounded-lg hover:scale-105 bg-slate-200 active:scale-90"
    >
      <Squares2X2Icon className="w-5" />
      <span className="text-sm font-semibold">Show all photos</span>
    </button>
  );
}

export default ShowMorePhotosButton;
