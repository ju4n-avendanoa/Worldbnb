import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function UserMenu() {
  const { data: session } = useSession();
  console.log(session?.user.id);
  return (
    <div className="absolute right-0 w-64 py-2 bg-white border shadow-lg rounded-xl top-14">
      {session ? (
        <ul className="flex flex-col">
          <Link href={`/myAccount/${session.user.id}`}>
            <li className="px-6 py-2 hover:bg-gray-100">My Profile</li>
          </Link>
          <Link href={`/myAccount/trips/${session.user.id}`}>
            <li className="px-6 py-2 hover:bg-gray-100">Trips</li>
          </Link>
          <li
            className="px-6 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign out
          </li>
        </ul>
      ) : (
        <ul className="flex flex-col">
          <Link href={"/register"}>
            <li className="px-6 py-2 hover:bg-gray-100">Sign up</li>
          </Link>
          <Link href={"/login"}>
            <li className="px-6 py-2 hover:bg-gray-100">Log in</li>
          </Link>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
