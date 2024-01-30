import { perksLogos } from "@/utils/perksLogos";
import ImageWithFallback from "./ImageWithFallback";
import { useState } from "react";

function UploadImages() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event: any) => {
    const files = event.target.files;
    setSelectedFiles(files);
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
            alt={"upload"}
            height={40}
            width={40}
          />
          <p>upload files</p>
        </div>
      </label>
      <input
        type="file"
        id="upload"
        className=""
        multiple
        onChange={handleFileChange}
      />
      {selectedFiles.length > 0 && (
        <div>
          <p>Archivos seleccionados:</p>
          <ul>
            {Array.from(selectedFiles).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default UploadImages;
