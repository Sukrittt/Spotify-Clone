"use client";
import { FC } from "react";

import { Song } from "@/types";
import MediaItem from "@/components/ListItem/MediaItem";
import LikeButton from "@/ui/Button/LikeButton";
import useOnPlay from "@/hooks/Player/useOnPlay";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-2 px-6">
      {songs.map((song) => (
        <div key={song.id} className="flex w-full items-center gap-x-4">
          <div className="flex-1">
            <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
