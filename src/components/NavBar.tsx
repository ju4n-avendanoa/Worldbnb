import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import Logo from "./Logo";
import Link from "next/link";

function NavBar() {
  return (
    <nav className="flex justify-between items-center p-4">
      <Logo />

      <div className="flex items-center border border-black rounded-full py-2 px-4 gap-2 shadow-lg">
        <a href="">
          <Bars3Icon className="w-6 h-6" />
        </a>
        <Link href="/login" className="flex gap-2">
          <UserCircleIcon className="w-6 h-6  fill-[#60A5FA]" />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
