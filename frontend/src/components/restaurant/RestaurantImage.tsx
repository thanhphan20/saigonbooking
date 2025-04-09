"use client";

import Image from "next/image";
import { useState } from "react";

interface RestaurantImageProps {
  src: string;
  alt: string;
  defaultImage: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  height?: number;
  width?: number;
}

export default function RestaurantImage({
  src,
  alt,
  defaultImage,
  fill = false,
  sizes,
  className,
  height,
  width,
}: RestaurantImageProps) {
  const [imgSrc, setImgSrc] = useState(src || defaultImage);

  const handleError = () => {
    setImgSrc(defaultImage);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      height={height}
      width={width}
      onError={handleError}
    />
  );
}
