import React from "react";

function Loading() {
  return (
    <main className="w-screen min-h-screen loader-parent">
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    </main>
  );
}

export default Loading;
