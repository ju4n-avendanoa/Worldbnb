import LoginForm from "@/app/login/LoginForm";
import React, { Suspense } from "react";
import Loading from "../loading";

function page() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginForm />;
    </Suspense>
  );
}

export default page;
