import { ImageProps } from "next/image";

export interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}
