"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function LoadProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProgressBar />
    </>
  );
}

export default LoadProvider;
