import React from "react";

function Loading() {
  return (
    <main className="loader-parent min-h-screen w-screen">
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    </main>
  );
}

export default Loading;
