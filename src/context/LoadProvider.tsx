"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Suspense } from "react";

function LoadProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Suspense>
        <ProgressBar
          height="5px"
          color="#2b6cb0"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </Suspense>
    </>
  );
}

export default LoadProvider;
