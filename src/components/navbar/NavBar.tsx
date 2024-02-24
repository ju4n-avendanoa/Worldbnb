"use client";

import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Suspense, useState } from "react";
import { useSession } from "next-auth/react";
import ImageWithFallback from "../ImageWithFallback";
import SearchInput from "./SearchInput";
import UserMenu from "./UserMenu";
import Logo from "./Logo";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import MobileFilters from "./MobileFilters";

function NavBar() {
  const [details, setDetails] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-20 flex flex-col gap-4 px-8 md:px-16 py-2 bg-white border">
      <div className="flex items-center justify-between">
        <Logo />

        <Suspense>
          <SearchInput />
        </Suspense>

        <section className="flex gap-2">
          <div
            className="cursor-pointer px-4 py-2 border border-gray-300 rounded-full lg:hidden"
            onClick={() => setShowMobileFilters(true)}
          >
            <AdjustmentsHorizontalIcon className="w-6 h-6" />
          </div>
          <div
            className="relative px-4 py-2 border border-gray-300 rounded-full"
            onClick={() => setDetails(!details)}
          >
            <div className="flex gap-2 cursor-pointer">
              <Bars3Icon className="w-6 h-6" />
              {session?.user.image ? (
                <ImageWithFallback
                  src={session.user.image}
                  alt="profile-photo"
                  width={300}
                  height={300}
                  className="w-6 h-auto rounded-full"
                  fallbackSrc="https://res.cloudinary.com/dhjqarghy/image/upload/v1708459216/Airbnb/user-circle-svgrepo-com_o8x5oh.svg"
                />
              ) : (
                <UserCircleIcon className="w-6 h-6 fill-[#2D7FCC]" />
              )}
            </div>

            {details ? <UserMenu /> : null}
          </div>
        </section>
        <Suspense>
          <MobileFilters
            onClose={() => setShowMobileFilters(false)}
            isVisible={showMobileFilters}
          />
        </Suspense>
      </div>
    </nav>
  );
}

export default NavBar;
