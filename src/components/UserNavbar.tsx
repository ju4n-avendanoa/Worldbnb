"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

function UserNavbar() {
  const { data: session } = useSession();

  return (
    <nav>
      <ul>
        <Link href={`/myAccount/${session?.user.id}`}>
          <li className="">my profile</li>
        </Link>
        <Link href={`/myAccount/${session?.user.id}/places`}>
          <li className="">My places</li>
        </Link>
      </ul>
    </nav>
  );
}

export default UserNavbar;
