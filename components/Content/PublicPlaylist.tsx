"use client";
import { FC } from "react";

import { Playlist } from "@/types";
import PublicPlaylistItem from "@/components/ListItem/PublicPlaylistItem";

interface PublicPlaylistProps {
  playlists: Playlist[];
}

const PublicPlaylist: FC<PublicPlaylistProps> = ({ playlists }) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      {playlists.map((data) => (
        <PublicPlaylistItem key={data.image_path} data={data} />
      ))}
    </div>
  );
};

export default PublicPlaylist;
