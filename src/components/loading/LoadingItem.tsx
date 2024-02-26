import React from "react";

function LoadingItem() {
  return (
    <section className="flex flex-col gap-6">
      <div className="bg-white p-2 h-[400px] rounded-2xl flex flex-col gap-5 select-none ">
        <div className="bg-gray-200 h-2/3 rounded-xl animate-pulse"></div>
        <div className="flex flex-col flex-1 gap-5 h-1/3 sm:p-2">
          <div className="flex flex-col flex-1 gap-3">
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
          </div>
          <div className="flex gap-3 mt-auto">
            <div className="w-full h-8 ml-auto bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoadingItem;
