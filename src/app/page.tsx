import LoadingMainPage from "@/components/LoadingMainPage";
import { Suspense } from "react";
import MainPage from "./MainPage";

export default async function Home() {
  return (
    <main className="w-full min-h-screen ">
      <Suspense fallback={<LoadingMainPage />}>
        <MainPage />
      </Suspense>
    </main>
  );
}
