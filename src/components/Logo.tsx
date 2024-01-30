import { GlobeAmericasIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function Logo() {
  return (
    <div className="text-lg">
      <Link href={"/"} className="flex items-center">
        <GlobeAmericasIcon className="w-6 h-6 mr-1 md:w-10 md:h-10" />
        <span>world</span>
        <span className="text-sky-600">bnb</span>
      </Link>
    </div>
  );
}

export default Logo;
