"use client";

import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

function NavBar() {
  const { data: session } = useSession();
  const [details, setDetails] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4">
      <Logo />
      <div
        className="relative px-4 py-2 border border-gray-300 rounded-full"
        onClick={() => setDetails(!details)}
      >
        {session ? (
          <div className="flex gap-4 cursor-pointer">
            <p>{session.user.name}</p>
            <Bars3Icon className="w-6 h-6" />
          </div>
        ) : (
          <div className="flex gap-4 cursor-pointer">
            <Bars3Icon className="w-6 h-6" />
            <UserCircleIcon className="w-6 h-6  fill-[#60A5FA]" />
          </div>
        )}
        {details ? <UserMenu /> : null}
      </div>
    </nav>
  );
}

export default NavBar;
