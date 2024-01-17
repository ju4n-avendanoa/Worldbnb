"use client";

import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import Logo from "./Logo";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between p-4">
      <Logo />
      <div className="flex items-center gap-2 px-4 py-2 border border-black rounded-full shadow-lg">
        {session ? (
          <div>
            <p>{session.user.name}</p>
            <button onClick={() => signOut({ callbackUrl: "/login" })}>
              Sign out
            </button>
          </div>
        ) : (
          <div>
            <Link href="">
              <Bars3Icon className="w-6 h-6" />
            </Link>
            <Link href="/login" className="flex gap-2">
              <UserCircleIcon className="w-6 h-6  fill-[#60A5FA]" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
