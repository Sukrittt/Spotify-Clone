"use client";
import { FC } from "react";
import Image from "next/image";

import { Playlist } from "@/types";
import useLoadImage from "@/hooks/MediaUrl/useLoadPlayListImage";

interface ImageProviderProps {
  data: Playlist[];
}

const ImageProvider: FC<ImageProviderProps> = ({ data }) => {
  const playListImage = useLoadImage(data[0]);

  return (
    <Image
      src={playListImage || "/images/playlist.png"}
      alt="liked"
      fill
      className="object-cover"
    />
  );
};

export default ImageProvider;
