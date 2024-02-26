import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Photos } from "@/interfaces/placeinterface";
import ImageWithFallback from "../ImageWithFallback";
import { fallbackImage } from "@/utils/fallbackImage";

type Props = {
  showCarousel: boolean;
  setShowCarousel: Dispatch<SetStateAction<boolean>>;
  photos: Photos[];
};

function PhotoCarousel({ showCarousel, setShowCarousel, photos }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!showCarousel) return null;

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className={`bg-white fixed inset-x-0 bottom-0 ${
        showCarousel ? "animate-in slide-in-from-bottom" : "slide-out-to-bottom"
      } z-40 duration-500 w-full h-full`}
    >
      <ArrowLeftCircleIcon
        onClick={() => {
          setActiveIndex(0);
          setShowCarousel(false);
        }}
        className="absolute w-8 transition duration-150 rounded-full top-4 left-4 hover:bg-gray-200 active:scale-90"
      />
      <div className="flex flex-col items-center justify-center w-11/12 h-full gap-4 mx-auto lg:w-1/2">
        <h2 className="text-4xl font-semibold text-sky-800">All photos</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="h-2/3"
        >
          <CarouselContent
            className="w-full h-full"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {photos.map((photo) => (
              <CarouselItem
                key={photo.photoId}
                className="flex justify-center w-full h-full"
              >
                <ImageWithFallback
                  src={photo.url}
                  alt="photo"
                  width={1000}
                  height={1000}
                  fallbackSrc={fallbackImage}
                  className="object-cover w-full h-full rounded-xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            onClick={prevSlide}
            className="max-lg:absolute max-lg:left-4 max-lg:top-1/2"
          />
          <CarouselNext
            onClick={nextSlide}
            className="max-lg:absolute max-lg:right-8 max-lg:top-1/2"
          />
        </Carousel>
        <div className="flex justify-center mt-4">
          {photos.map((_, index) => (
            <span
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-4 h-4 mx-2 cursor-pointer rounded-full ${
                index === activeIndex ? "bg-sky-700" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoCarousel;
