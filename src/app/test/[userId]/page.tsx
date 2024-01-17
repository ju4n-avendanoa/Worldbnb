"use client";

import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

function Dash() {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);

  return <div>Dash</div>;
}

export default Dash;
