import React from "react";
import ProviderButton from "./ProviderButton";

function ProviderLogs() {
  return (
    <section className="flex flex-col gap-2 my-4">
      <section className="flex items-center">
        <div className="flex-1 mr-4 border-t border-gray-400"></div>
        <p className="text-xs">OR</p>
        <div className="flex-1 ml-4 border-t border-gray-400"></div>
      </section>
      <ProviderButton
        imagesrc={
          "https://res.cloudinary.com/dhjqarghy/image/upload/v1705447579/Logos/i5swnf9wnaniqkscyyd5.svg"
        }
        provider={"Google"}
      />
      <ProviderButton
        imagesrc={
          "https://res.cloudinary.com/dhjqarghy/image/upload/v1705447579/Logos/wmgtjnayj10lqp8pcued.svg"
        }
        provider={"GitHub"}
      />
    </section>
  );
}

export default ProviderLogs;
