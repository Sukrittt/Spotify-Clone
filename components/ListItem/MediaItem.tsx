"use client";
import { FC } from "react";
import Image from "next/image";

import { Song } from "@/types";
import useLoadImage from "@/hooks/MediaUrl/useLoadImage";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50"
    >
      <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
        <Image
          fill
          src={imageUrl || "/images/song_placeholder.png"}
          alt="song-cover"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="md:max-w[80vw] max-w-[40vw] truncate text-white sm:max-w-[60vw]">
          {data.title}
        </p>
        <p className="truncate text-sm text-neutral-400">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
