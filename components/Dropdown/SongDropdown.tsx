"use client";
import { FC, useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineCaretRight } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

import { Playlist } from "@/types";
import { useUser } from "@/hooks/User/useUser";
import useAuthModal from "@/hooks/Modals/useAuthModal";
import useRefetchModal from "@/hooks/Modals/useRefetchModal";
import usePlaylistModal from "@/hooks/Modals/usePlaylistModal";

interface SongDropdownProps {
  songId: string;
  userPlaylists: Playlist[];
  playlistOwner: string;
}

const SongDropdown: FC<SongDropdownProps> = ({
  songId,
  userPlaylists: playlists,
  playlistOwner,
}) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();

  const searchParams = useSearchParams();
  const playlistName = searchParams.get("name");

  const userPlaylists = playlists.filter(
    (playlist) => playlist.name !== playlistName
  );

  const { refetch, setRefetch } = useRefetchModal();
  const authModal = useAuthModal();
  const playlistModal = usePlaylistModal();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id, refetch]);

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      await dislikeSong();
    } else {
      await likeSong();
    }

    router.refresh();
    setRefetch(refetch);
  };

  const likeSong = async () => {
    if (!user) {
      return;
    }

    const { error } = await supabaseClient.from("liked_songs").insert({
      user_id: user.id,
      song_id: songId,
    });

    if (error) {
      toast.error(error.message);
    } else {
      setIsLiked(true);
      toast.success("Added to your Liked Songs");
    }
  };

  const dislikeSong = async () => {
    if (!user) {
      return;
    }

    const { error } = await supabaseClient
      .from("liked_songs")
      .delete()
      .eq("user_id", user.id)
      .eq("song_id", songId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Removed from your Liked Songs");
      setIsLiked(false);
    }
  };

  const removeSongFromPlaylist = async () => {
    if (!user) {
      return;
    }

    const { error } = await supabaseClient
      .from("playlists")
      .delete()
      .eq("user_id", user.id)
      .eq("song_id", songId)
      .eq("name", playlistName);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Removed song from your playlist");
      setRefetch(refetch);
    }

    router.refresh();
  };

  const addSongToPlaylist = async (playlist: Playlist) => {
    if (!user) {
      return;
    }

    if (await checkDuplicationSongInPlaylist(playlist.name)) {
      return toast.error("This song already exists on this playlist");
    }

    const { error } = await supabaseClient.from("playlists").insert({
      user_id: user.id,
      song_id: songId,
      name: playlist.name,
      image_path: playlist.image_path,
      public: playlist.public || false,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Added song to your playlist!");
    }

    router.refresh();
  };

  const checkDuplicationSongInPlaylist = async (name: string) => {
    if (!user) {
      return;
    }

    const { data: existingData, error: existingError } = await supabaseClient
      .from("playlists")
      .select()
      .eq("user_id", user.id)
      .eq("name", name)
      .eq("song_id", songId);

    if (!existingError && existingData.length > 0) {
      return true;
    }
    return false;
  };

  const handleCreatePlaylistWithSong = () => {
    if (!user) {
      return authModal.onOpen();
    }

    playlistModal.setSongId(songId);
    return playlistModal.onOpen();
  };

  return (
    <div className="hidden md:block">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="text-neutral-500 transition hover:text-white">
            <BiDotsVerticalRounded size={20} />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="
             relative left-8 min-w-[180px] rounded-md bg-neutral-800 p-[5px] shadow-lg shadow-neutral-900 will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade md:left-24"
            sideOffset={5}
          >
            {playlistOwner === user?.id && (
              <DropdownMenu.Item
                onClick={removeSongFromPlaylist}
                className="cursor-pointer rounded-md p-3 transition hover:bg-neutral-600 hover:outline-none"
              >
                <p className="truncate text-sm">Remove from this playlist</p>
              </DropdownMenu.Item>
            )}
            <DropdownMenu.Item
              onClick={handleLike}
              className="cursor-pointer rounded-md p-3 transition hover:bg-neutral-600 hover:outline-none"
            >
              <p className="truncate text-sm">
                {isLiked
                  ? "Remove from your Liked Songs"
                  : "Save to your Liked Songs"}
              </p>
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className="flex cursor-pointer items-center justify-end rounded-md p-3 transition hover:bg-neutral-600 hover:outline-none">
                <p className="truncate text-sm">Add to Playlist</p>
                <div className="text-mauve11 group-data-[disabled]:text-mauve8 ml-auto pl-[20px] group-data-[highlighted]:text-white">
                  <AiOutlineCaretRight size={14} />
                </div>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  className="min-w-[200px] rounded-md bg-neutral-800 shadow-lg shadow-neutral-900 will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade
                  "
                  sideOffset={2}
                  alignOffset={-5}
                >
                  <DropdownMenu.Item
                    onClick={handleCreatePlaylistWithSong}
                    className="cursor-pointer rounded-md p-3 transition hover:bg-neutral-600 hover:outline-none"
                  >
                    <p className="truncate text-sm">Create playlist</p>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="h-[0.5px] bg-neutral-700" />
                  {userPlaylists.map((playlist) => (
                    <DropdownMenu.Item
                      key={playlist.created_at}
                      onClick={() => addSongToPlaylist(playlist)}
                      className="cursor-pointer rounded-md p-3 transition hover:bg-neutral-600 hover:outline-none"
                    >
                      <div className="flex items-center gap-x-1">
                        <p className="truncate text-sm">{playlist.name}</p>
                        {playlist.public && (
                          <p className="truncate text-sm text-neutral-400">
                            - Public
                          </p>
                        )}
                      </div>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default SongDropdown;
