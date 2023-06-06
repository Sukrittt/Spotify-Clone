"use client";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Playlist } from "@/types";
import { formatTimeSecondary } from "@/lib/utils";

const useTotalDuration = (playlistSongs: Playlist[]) => {
  const supabaseClient = useSupabaseClient();
  const songUrls: string[] = [];

  const [totalDuration, setTotalDuration] = useState<number>(0);

  useEffect(() => {
    setTotalDuration(0);

    let tempPlaylist = playlistSongs;
    tempPlaylist = tempPlaylist.filter((object) => object.songs !== null);

    tempPlaylist.map((playlist) => {
      const { data: songData } = supabaseClient.storage
        .from("songs")
        .getPublicUrl(playlist.songs.song_path);

      const url = songData.publicUrl;
      songUrls.push(url);
    });
  }, [playlistSongs.length]);

  useEffect(() => {
    songUrls.map((url) => {
      const audio = new Audio(url);

      audio.addEventListener("loadedmetadata", () => {
        const duration = audio.duration;
        setTotalDuration((prev) => prev + duration);
      });
    });
  }, [playlistSongs.length]);

  if (totalDuration === 0) {
    return null;
  }

  const formatedDuration = formatTimeSecondary(totalDuration);

  return formatedDuration;
};

export default useTotalDuration;
