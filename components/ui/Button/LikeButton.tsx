"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";

import useAuthModal from "@/hooks/Modals/useAuthModal";
import { useUser } from "@/hooks/User/useUser";
import useRefetchModal from "@/hooks/Modals/useRefetchModal";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const { refetch, setRefetch } = useRefetchModal();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

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
      } else {
        setIsLiked(false);
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
      setIsLiked(false);
      toast.success("Removed from your Liked Songs");
    }
  };

  return (
    <button className="transition hover:opacity-75" onClick={handleLike}>
      <Icon color={isLiked ? "#22c55e" : "white"} size={20} />
    </button>
  );
};

export default LikeButton;
