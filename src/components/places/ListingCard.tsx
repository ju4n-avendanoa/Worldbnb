"use client";

import { fallbackImage } from "@/utils/fallbackImage";
import { Photos, Place } from "@/interfaces/placeinterface";
import { useRouter } from "next-nprogress-bar";
import { addComma } from "@/utils/addComma";
import { motion } from "framer-motion";
import ImageWithFallback from "../ImageWithFallback";

type Props = {
  place: Place;
  photos: Photos | undefined;
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function ListingCard({ place, photos }: Props) {
  const router = useRouter();
  const formattedPrice = addComma(place.price);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="h-full"
    >
      <div
        onClick={() => router.push(`/places/${place.id}`)}
        className="h-full transition duration-200 cursor-pointer hover:scale-105"
      >
        <ImageWithFallback
          src={photos?.url!}
          alt="photo"
          width={1000}
          height={1000}
          fallbackSrc={fallbackImage}
          className="object-cover w-full rounded-2xl h-2/3"
        />
        <div className="flex flex-col gap-1 py-2 text-sm xl:text-base">
          <h3 className="font-semibold line-clamp-2">{`${place.title}, ${place.country}`}</h3>
          <p className="text-neutral-500 line-clamp-2">{place.address}</p>
          <p className="font-semibold ">{`$${formattedPrice} ${place.currency}`}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default ListingCard;
