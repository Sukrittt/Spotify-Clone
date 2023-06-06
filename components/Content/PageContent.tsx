"use client";
import { FC } from "react";

import { Song } from "@/types";
import SongItem from "@/components/ListItem/SongItem";
import useOnPlay from "@/hooks/Player/useOnPlay";

interface PageContentProps {
  songs: Song[];
}

const PageContent: FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      {songs.map((item) => (
        <SongItem
          key={item.id}
          onClick={(id: string) => onPlay(id)}
          data={item}
        />
      ))}
    </div>
  );
};

export default PageContent;
