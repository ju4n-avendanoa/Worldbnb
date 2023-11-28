import { GlobeAmericasIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function Logo() {
  return (
    <div className="text-lg">
      <Link href={"/"} className="flex items-center">
        <GlobeAmericasIcon className="md:w-10 md:h-10 w-6 h-6 mr-1" />
        <span>world</span>
        <span className="text-blue-400">bnb</span>
      </Link>
    </div>
  );
}

export default Logo;
