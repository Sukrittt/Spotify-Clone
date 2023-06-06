"use client";
import { FC } from "react";
import { TbPlaylist } from "react-icons/tb";

import MediaItem from "@/components/ListItem/MediaItem";

import useOnPlay from "@/hooks/Player/useOnPlay";

import { Song } from "@/types";
import OptionsDropdown from "@/components/Dropdown/OptionsDropdown";

interface LibraryProps {
  songs: Song[];
}

const Library: FC<LibraryProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-md font-medium text-neutral-400">Your Library</p>
        </div>
        <OptionsDropdown />
      </div>
      <div className="mt-4 flex flex-col gap-y-2 px-3">
        {songs.map((item) => (
          <MediaItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
