"use client";
import { FC } from "react";

import { Playlist } from "@/types";
import ListItem from "@/components/ListItem/ListItem";
import useLoadImage from "@/hooks/MediaUrl/useLoadPlayListImage";

interface PlaylistItemProps {
  data: Playlist;
}

const PlaylistItem: FC<PlaylistItemProps> = ({ data }) => {
  const loadPlaylistImage = useLoadImage(data);

  return (
    <ListItem
      image={loadPlaylistImage ? loadPlaylistImage : "/images/playlist.png"}
      name={data.name}
      href={`playlist?name=${data.name}`}
    />
  );
};

export default PlaylistItem;
