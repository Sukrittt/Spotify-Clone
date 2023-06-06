"use client";
import { motion } from "framer-motion";

import PlayerContent from "@/components/Content/PlayerContent";

import useLoadSong from "@/hooks/MediaUrl/useLoadSong";
import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/Player/usePlayer";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSong(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: "80px" }}
      animate={{ y: 0 }}
      className="fixed bottom-0 h-[80px] w-full bg-black px-4 py-2"
    >
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </motion.div>
  );
};

export default Player;
