"use client";
import ImageWithFallback from "./ImageWithFallback";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

function Banner() {
  return (
    <div className="w-2/5 px-16 mx-auto select-none h-2/5">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="-ml-4">
          <CarouselItem className="">
            <ImageWithFallback
              src={
                "https://res.cloudinary.com/dhjqarghy/image/upload/v1707342387/Airbnb/pexels-skitterphoto-584399_qt5giz.jpg"
              }
              alt="banner"
              width={1000}
              height={1000}
              fallbackSrc="https://res.cloudinary.com/dhjqarghy/image/upload/v1707341572/Airbnb/fransiskus-filbert-mangundap-l8OKlH71Xh0-unsplash_btsjjg.jpg"
              className=""
            />
          </CarouselItem>
          <CarouselItem className="">
            <ImageWithFallback
              src={
                "https://res.cloudinary.com/dhjqarghy/image/upload/v1707342387/Airbnb/pexels-skitterphoto-584399_qt5giz.jpg"
              }
              alt="banner"
              width={1000}
              height={1000}
              fallbackSrc="https://res.cloudinary.com/dhjqarghy/image/upload/v1707341572/Airbnb/fransiskus-filbert-mangundap-l8OKlH71Xh0-unsplash_btsjjg.jpg"
              className=""
            />
          </CarouselItem>
          <CarouselItem className="">
            <ImageWithFallback
              src={
                "https://res.cloudinary.com/dhjqarghy/image/upload/v1707342387/Airbnb/pexels-skitterphoto-584399_qt5giz.jpg"
              }
              alt="banner"
              width={1000}
              height={1000}
              fallbackSrc="https://res.cloudinary.com/dhjqarghy/image/upload/v1707341572/Airbnb/fransiskus-filbert-mangundap-l8OKlH71Xh0-unsplash_btsjjg.jpg"
              className=""
            />
          </CarouselItem>
          <CarouselItem className="">
            <ImageWithFallback
              src={
                "https://res.cloudinary.com/dhjqarghy/image/upload/v1707342387/Airbnb/pexels-skitterphoto-584399_qt5giz.jpg"
              }
              alt="banner"
              width={1000}
              height={1000}
              fallbackSrc="https://res.cloudinary.com/dhjqarghy/image/upload/v1707341572/Airbnb/fransiskus-filbert-mangundap-l8OKlH71Xh0-unsplash_btsjjg.jpg"
              className=""
            />
          </CarouselItem>
          <CarouselItem className="">
            <ImageWithFallback
              src={
                "https://res.cloudinary.com/dhjqarghy/image/upload/v1707342387/Airbnb/pexels-skitterphoto-584399_qt5giz.jpg"
              }
              alt="banner"
              width={1000}
              height={1000}
              fallbackSrc="https://res.cloudinary.com/dhjqarghy/image/upload/v1707341572/Airbnb/fransiskus-filbert-mangundap-l8OKlH71Xh0-unsplash_btsjjg.jpg"
              className=""
            />
          </CarouselItem>
          <CarouselItem className="">
            <ImageWithFallback
              src={
                "https://res.cloudinary.com/dhjqarghy/image/upload/v1707342387/Airbnb/pexels-skitterphoto-584399_qt5giz.jpg"
              }
              alt="banner"
              width={1000}
              height={1000}
              fallbackSrc="https://res.cloudinary.com/dhjqarghy/image/upload/v1707341572/Airbnb/fransiskus-filbert-mangundap-l8OKlH71Xh0-unsplash_btsjjg.jpg"
              className=""
            />
          </CarouselItem>
          <CarouselItem className="">
            <ImageWithFallback
              src={
                "https://res.cloudinary.com/dhjqarghy/image/upload/v1707342387/Airbnb/pexels-skitterphoto-584399_qt5giz.jpg"
              }
              alt="banner"
              width={1000}
              height={1000}
              fallbackSrc="https://res.cloudinary.com/dhjqarghy/image/upload/v1707341572/Airbnb/fransiskus-filbert-mangundap-l8OKlH71Xh0-unsplash_btsjjg.jpg"
              className=""
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Banner;
