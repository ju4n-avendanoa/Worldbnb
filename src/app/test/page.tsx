import Link from "next/link";
import React from "react";

function Loading() {
  return (
    <section className="flex justify-center pt-28 min-h-screen">
      <div className="flex flex-col gap-5 items-center">
        <h2 className="text-sky-700 font-bold text-3xl">There was an error</h2>
        <p>
          Please try again or come back to the main page{" "}
          <Link
            href={"/"}
            className="text-sky-700 font-semibold underline-offset-2 underline"
          >
            here
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Loading;
