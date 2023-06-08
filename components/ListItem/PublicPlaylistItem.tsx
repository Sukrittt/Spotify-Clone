"use client";
import { FC } from "react";
import qs from "query-string";
import Image from "next/image";

import { Playlist } from "@/types";
import useLoadImage from "@/hooks/MediaUrl/useLoadPlayListImage";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/User/useUser";
import useAuthModal from "@/hooks/Modals/useAuthModal";

interface PublicPlaylistItemProps {
  data: Playlist;
}

const PublicPlaylistItem: FC<PublicPlaylistItemProps> = ({ data }) => {
  const { user } = useUser();
  const { onOpen } = useAuthModal();

  const imagePath = useLoadImage(data);
  const router = useRouter();

  const handlePlaylistRoute = () => {
    if (!user) {
      return onOpen();
    }

    const query = {
      name: data.name,
      public: true,
    };

    const url = qs.stringifyUrl({
      url: "/playlist",
      query,
    });

    return router.push(url);
  };

  return (
    <div
      onClick={handlePlaylistRoute}
      className="group relative flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
    >
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
        <Image
          className="object-cover"
          src={imagePath || "/images/playlist.png"}
          fill
          alt="song-cover"
        />
      </div>
      <div className="flex w-full flex-col items-start gap-y-1 pt-4">
        <p className="w-full truncate font-semibold">{data.name}</p>
        <p className="w-full truncate pb-4 text-sm text-neutral-400">
          By {data.user_name ? data.user_name : "Anonymous"}
        </p>
      </div>
    </div>
  );
};

export default PublicPlaylistItem;
