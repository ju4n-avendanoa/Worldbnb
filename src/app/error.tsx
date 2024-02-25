"use client";

import Link from "next/link";
import React from "react";

function Error() {
  return (
    <section className="flex justify-center items-center gap-10 pt-20 flex-col">
      <h2 className="font-bold text-3xl">There was an error</h2>
      <p>
        Please try again or come back to the main page{" "}
        <Link
          href={"/"}
          className="underline underline-offset-2 text-sky-700 font-bold"
        >
          here
        </Link>
      </p>
    </section>
  );
}

export default Error;
