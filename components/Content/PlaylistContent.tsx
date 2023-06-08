"use client";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { BsShuffle } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

import SearchInput from "@/ui/Input/SearchInput";
import AddButton from "@/ui/Button/AddButton";
import LikeButton from "@/ui/Button/LikeButton";
import MediaItem from "@/components/ListItem/MediaItem";
import SongDropdown from "@/components/Dropdown/SongDropdown";

import { useUser } from "@/hooks/User/useUser";
import usePlayer from "@/hooks/Player/usePlayer";
import useOnPlay from "@/hooks/Player/useOnPlay";
import { Playlist, Song } from "@/types";
import { selectRandomSong } from "@/lib/utils";

interface PlaylistContentProps {
  playlist: Playlist[];
  songsByTitle: Song[];
  playlistSongs: Song[];
  userPlaylists: Playlist[];
}

const PlaylistContent: FC<PlaylistContentProps> = ({
  playlist,
  songsByTitle,
  playlistSongs,
  userPlaylists,
}) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  const player = usePlayer();
  const onPlay = useOnPlay(playlistSongs);

  const isPublic = playlist[0].public || false;

  const href = isPublic
    ? `/playlist?name=${playlist[0].name}&public=${isPublic}`
    : `/playlist?name=${playlist[0].name}`;

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const handlePlaySong = () => {
    if (player.shuffle) {
      onPlay(selectRandomSong(playlistSongs));
    } else {
      onPlay(playlistSongs[0].id);
    }
  };

  if (playlist[0].user_id !== user?.id && playlistSongs.length === 0) {
    return (
      <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No songs in this playlist yet.
      </div>
    );
  }

  return (
    <>
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
        {playlistSongs.map((song) => (
          <div key={song.id} className="flex items-center">
            <SongDropdown
              songId={song.id}
              userPlaylists={userPlaylists}
              playlistOwner={playlist[0].user_id}
            />
            <div className="flex w-full items-center gap-x-4">
              <div className="flex-1">
                <MediaItem data={song} onClick={(id) => onPlay(id)} />
              </div>
              <LikeButton songId={song.id} />
            </div>
          </div>
        ))}
      </div>
      {user?.id === playlist[0].user_id && (
        <>
          <div className="flex w-full flex-col gap-y-2 truncate border-t border-neutral-700 px-6 py-3 text-lg font-semibold sm:mx-4 sm:text-xl">
            <h1>Let&rsquo;s find something for your playlist</h1>
            <div className="w-[90%] md:w-[60%]">
              <SearchInput href={href} />
            </div>
          </div>
          <div className="min-h-[50vh] px-8 pb-4">
            {songsByTitle.map((song) => (
              <div key={song.id} className="flex w-full items-center gap-x-4">
                <div className="flex-1">
                  <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
                </div>
                <AddButton playlist={playlist[0]} songId={song.id} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default PlaylistContent;
