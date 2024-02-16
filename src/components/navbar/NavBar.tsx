"use client";

import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Suspense, useState } from "react";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import SearchInput from "./SearchInput";
import { useSession } from "next-auth/react";
import Image from "next/image";

function NavBar() {
  const [details, setDetails] = useState(false);

  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-20 flex flex-col gap-4 px-16 py-2 bg-white border">
      <div className="flex items-center justify-between">
        <Logo />

        <Suspense>
          <SearchInput />
        </Suspense>

        <div
          className="relative px-4 py-2 border border-gray-300 rounded-full"
          onClick={() => setDetails(!details)}
        >
          <div className="flex gap-4 cursor-pointer">
            <Bars3Icon className="w-6 h-6" />
            {session?.user.image ? (
              <Image
                src={session.user.image}
                alt="profile-photo"
                width={300}
                height={300}
                className="w-6 h-auto rounded-full"
              />
            ) : (
              <UserCircleIcon className="w-6 h-6  fill-[#2D7FCC] hidden md:inline-flex" />
            )}
          </div>
          {details ? <UserMenu /> : null}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
