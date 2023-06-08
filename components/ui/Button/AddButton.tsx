"use client";
import { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

import { Playlist } from "@/types";
import { useUser } from "@/hooks/User/useUser";
import useAuthModal from "@/hooks/Modals/useAuthModal";
import useRefetchModal from "@/hooks/Modals/useRefetchModal";

interface AddButtonProps {
  playlist: Playlist;
  songId: string;
}

const AddButton: FC<AddButtonProps> = ({ playlist, songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const searchParams = useSearchParams();

  const isPublic = searchParams.get("public") || false;

  const { user } = useUser();
  const authModal = useAuthModal();

  const [isAdded, setIsAdded] = useState<boolean>(false);
  const { refetch } = useRefetchModal();

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("playlists")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .eq("name", playlist.name)
        .single();

      if (!error && data) {
        setIsAdded(true);
      } else {
        setIsAdded(false);
      }
    };
    fetchData();
  }, [songId, supabaseClient, user?.id, playlist.name, refetch]);

  const handleEditPlaylist = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isAdded) {
      removeSongFromPlaylist();
    } else {
      addSongToPlaylist();
    }

    router.refresh();
  };

  const addSongToPlaylist = async () => {
    if (!user) {
      return;
    }

    const { error } = await supabaseClient.from("playlists").insert({
      user_id: user.id,
      song_id: songId,
      name: playlist.name,
      image_path: playlist.image_path,
      public: isPublic,
    });

    if (error) {
      toast.error(error.message);
    } else {
      setIsAdded(true);
      toast.success("Added song to your playlist!");
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
      .eq("name", playlist.name)
      .eq("public", isPublic);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Removed song from your playlist");
      setIsAdded(false);
    }
  };

  return (
    <button
      onClick={handleEditPlaylist}
      className={twMerge(
        "truncate rounded-full border border-neutral-600 bg-transparent px-3 py-1 text-sm font-semibold transition hover:border-white",
        isAdded && "bg-neutral-500"
      )}
    >
      {isAdded ? "Added" : "Add"}
    </button>
  );
};

export default AddButton;
