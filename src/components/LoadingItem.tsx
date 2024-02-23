import React from "react";

function LoadingItem() {
  return (
    <section className="flex flex-col gap-6">
      <div className="bg-white p-2 h-[400px] rounded-2xl flex flex-col gap-5 select-none ">
        <div className="h-2/3 rounded-xl bg-gray-200 animate-pulse"></div>
        <div className="flex flex-col flex-1 h-1/3 gap-5 sm:p-2">
          <div className="flex flex-1 flex-col gap-3">
            <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
          </div>
          <div className="mt-auto flex gap-3">
            <div className="bg-gray-200 w-full h-8 animate-pulse rounded-full ml-auto"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoadingItem;
