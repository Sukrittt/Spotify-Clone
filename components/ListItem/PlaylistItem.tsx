"use client";
import { FC } from "react";
import qs from "query-string";

import { Playlist } from "@/types";
import ListItem from "@/components/ListItem/ListItem";
import useLoadImage from "@/hooks/MediaUrl/useLoadPlayListImage";

interface PlaylistItemProps {
  data: Playlist;
}

const PlaylistItem: FC<PlaylistItemProps> = ({ data }) => {
  const loadPlaylistImage = useLoadImage(data);

  const query = data.public
    ? {
        name: data.name,
        public: data.public,
      }
    : {
        name: data.name,
      };

  const href = qs.stringifyUrl({
    url: "/playlist",
    query,
  });

  return (
    <ListItem
      image={loadPlaylistImage ? loadPlaylistImage : "/images/playlist.png"}
      name={data.name}
      href={href}
      isPublic={data.public}
    />
  );
};

export default PlaylistItem;
