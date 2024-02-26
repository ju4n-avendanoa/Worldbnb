import { Suspense } from "react";
import LoadingMainPage from "@/components/loading/LoadingMainPage";
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
