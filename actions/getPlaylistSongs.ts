import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

const getPlaylistSongs = async (
  name: string,
  isPublic?: boolean
): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies: cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let data;

  if (isPublic) {
    const { data: publicData, error } = await supabase
      .from("playlists")
      .select("*, songs(*)")
      .is("public", true)
      .eq("name", name)
      .order("created_at", { ascending: false });

    data = publicData;
    if (error) {
      console.log(error);
      return [];
    }
  } else {
    const { data: privateData, error } = await supabase
      .from("playlists")
      .select("*, songs(*)")
      .eq("user_id", session?.user?.id)
      .eq("name", name)
      .order("created_at", { ascending: false });

    data = privateData;

    if (error) {
      console.log(error);
      return [];
    }
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item.songs,
  }));
};

export default getPlaylistSongs;
