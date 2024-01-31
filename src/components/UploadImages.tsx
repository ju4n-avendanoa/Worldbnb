import { perksLogos } from "@/utils/perksLogos";
import ImageWithFallback from "./ImageWithFallback";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInputs } from "@/interfaces/formInterface";

type Props = {
  errors: FieldErrors<FormInputs>;
  register: UseFormRegister<FormInputs>;
};

function UploadImages({ register, errors }: Props) {
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <label htmlFor="upload">
        <span className="font-semibold">Photos</span>
        <div className="flex flex-col items-center p-2 border cursor-pointer w-36 rounded-2xl">
          <ImageWithFallback
            src={
              "https://res.cloudinary.com/dhjqarghy/image/upload/v1706112761/Airbnb/cloud-arrow-up-svgrepo-com_efugzf.svg"
            }
            fallbackSrc={perksLogos.default.link}
            alt="upload"
            height={40}
            width={40}
          />
          <p>upload files</p>
        </div>
      </label>
      <input
        type="file"
        id="upload"
        multiple
        required
        className=""
        {...register("photos")}
      />
    </>
  );
}

export default UploadImages;
