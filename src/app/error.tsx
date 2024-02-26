"use client";

import Link from "next/link";
import React from "react";

function Error() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 pt-20">
      <h2 className="text-3xl font-bold">There was an error</h2>
      <p>
        Please try again or come back to the main page{" "}
        <Link
          href={"/"}
          className="font-bold underline underline-offset-2 text-sky-700"
        >
          here
        </Link>
      </p>
    </section>
  );
}

export default Error;
