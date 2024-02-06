import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { perksLogos } from "@/utils/perksLogos";
import { FormInputs } from "@/interfaces/formInterface";
import { Photos } from "@/interfaces/placeinterface";
import ImageWithFallback from "./ImageWithFallback";
import { deletePhotos } from "@/utils/deletePhotos";

type Props = {
  errors: FieldErrors<FormInputs>;
  register: UseFormRegister<FormInputs>;
  setValue: UseFormSetValue<FormInputs>;
  selectedFiles: File[];
  setSelectedFiles: Dispatch<SetStateAction<File[]>>;
  cloudFilesToShow: Photos[];
  setCloudFilesToShow: Dispatch<SetStateAction<Photos[]>>;
};

function UploadImages({
  register,
  errors,
  setValue,
  setSelectedFiles,
  selectedFiles,
  cloudFilesToShow,
  setCloudFilesToShow,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setValue("photos", selectedFiles);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [selectedFiles]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles((prevFiles: File[]) => [
        ...prevFiles,
        ...Array.from(files),
      ]);
      setValue("photos", [...selectedFiles, ...Array.from(files)]);
    }
  };

  const handleDelete = async (fileToDelete: string | File) => {
    if (typeof fileToDelete === "string") {
      setCloudFilesToShow((prev) =>
        prev.filter((item) => item.photoId !== fileToDelete)
      );
      await deletePhotos(fileToDelete);
    } else {
      setSelectedFiles((prevFiles) =>
        prevFiles.filter((file) => fileToDelete.name !== file.name)
      );

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <label htmlFor="upload">
        <span className="font-semibold">Photos</span>
        <div className="flex flex-col items-center w-full p-2 border cursor-pointer rounded-2xl">
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
        name="photos"
        multiple
        ref={fileInputRef}
        className="hidden"
        {...(register("photos"),
        {
          onChange: handleFileChange,
        })}
      />
      <div className="grid w-full grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 py-4">
        {cloudFilesToShow.map((file) => (
          <div
            key={file.photoId}
            className="relative border border-black rounded-xl"
          >
            <ImageWithFallback
              src={file.url}
              fallbackSrc={perksLogos.default.link}
              alt="abc"
              width={1000}
              height={1000}
              className="object-cover w-full h-40 rounded-xl"
            />

            <ImageWithFallback
              src={
                "https://res.cloudinary.com/dhjqarghy/image/upload/v1706742726/Airbnb/tv4glsmefk57qbj7hpnl.svg"
              }
              fallbackSrc={perksLogos.default.link}
              alt="delete"
              width={20}
              height={20}
              className="absolute object-cover bg-red-600 rounded-xl bottom-3 right-2 hover:bg-red-400"
              onClick={() => handleDelete(file.photoId)}
            />
          </div>
        ))}
        {selectedFiles.map((file) => (
          <div
            key={typeof file === "string" ? file : file.name}
            className="relative border border-black rounded-xl"
          >
            <ImageWithFallback
              src={URL.createObjectURL(file)}
              fallbackSrc={perksLogos.default.link}
              alt="abc"
              width={40}
              height={40}
              className="object-cover w-full h-40 rounded-xl"
            />

            <ImageWithFallback
              src={
                "https://res.cloudinary.com/dhjqarghy/image/upload/v1706742726/Airbnb/tv4glsmefk57qbj7hpnl.svg"
              }
              fallbackSrc={perksLogos.default.link}
              alt="delete"
              width={20}
              height={20}
              className="absolute object-cover bg-red-600 rounded-xl bottom-3 right-2 hover:bg-red-400"
              onClick={() => handleDelete(file)}
            />
          </div>
        ))}
      </div>
      <div className={`${errors["photos"] ? "text-red-600" : ""} text-xs py-2`}>
        {errors.photos ? <p>{errors.photos.message}</p> : null}
      </div>
    </>
  );
}

export default UploadImages;
