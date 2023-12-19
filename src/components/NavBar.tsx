import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import Logo from "./Logo";
import Link from "next/link";

function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <Logo />

      <div className="flex items-center gap-2 px-4 py-2 border border-black rounded-full shadow-lg">
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
