"use client";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { BsShuffle } from "react-icons/bs";

import MediaItem from "@/components/ListItem/MediaItem";
import LikeButton from "@/ui/Button/LikeButton";

import { Song } from "@/types";
import { useUser } from "@/hooks/User/useUser";
import useOnPlay from "@/hooks/Player/useOnPlay";
import usePlayer from "@/hooks/Player/usePlayer";
import { selectRandomSong } from "@/lib/utils";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();

  const onPlay = useOnPlay(songs);
  const player = usePlayer();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No liked songs.
      </div>
    );
  }

  const handlePlaySong = () => {
    if (player.shuffle) {
      onPlay(selectRandomSong(songs));
    } else {
      onPlay(songs[0].id);
    }
  };

  return (
    <div className="flex w-full flex-col gap-y-3 p-6">
      <div className="mb-2 flex gap-x-4">
        <div
          onClick={handlePlaySong}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-green-500 p-3 drop-shadow-md transition hover:opacity-75"
        >
          <FaPlay className="text-black" />
        </div>
        <div
          onClick={() => player.setShuffle(player.shuffle)}
          className={twMerge(
            "flex cursor-pointer items-center justify-center text-neutral-400",
            player.shuffle && "text-green-500"
          )}
        >
          <BsShuffle size={20} />
        </div>
      </div>
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

export default LikedContent;
