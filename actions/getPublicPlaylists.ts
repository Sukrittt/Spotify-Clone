import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Playlist } from "@/types";

const getPublicPlaylists = async (): Promise<Playlist[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: playlistData, error } = await supabase
    .from("playlists")
    .select("*")
    .is("song_id", null)
    .is("public", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  const data = playlistData?.filter((object, index, self) => {
    return (
      index ===
      self.findIndex((obj) => {
        return obj.name === object.name;
      })
    );
  });

  return (data as any) || [];
};

export default getPublicPlaylists;
