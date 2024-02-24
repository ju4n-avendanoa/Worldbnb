"use client";

import Link from "next/link";
import React from "react";

function Error() {
  return (
    <section className="flex justify-center items-center gap-10 flex-col">
      <h2 className="font-bold text-3xl">There was an error</h2>
      <p>
        Please try again or come back to the main page{" "}
        <Link href={"/"}>here</Link>
      </p>
    </section>
  );
}

export default Error;
