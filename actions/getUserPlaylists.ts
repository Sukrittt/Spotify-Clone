import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Playlist } from "@/types";

const getUserPlaylists = async (): Promise<Playlist[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data: playlistData, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .is("song_id", null)
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

export default getUserPlaylists;
