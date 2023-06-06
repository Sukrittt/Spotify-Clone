import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Playlist } from "@/types";

const getPlaylistByName = async (name: string): Promise<Playlist[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from("playlists")
    .select("*, songs(*)")
    .eq("user_id", sessionData.session?.user.id)
    .ilike("name", `%${name}%`);

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getPlaylistByName;
