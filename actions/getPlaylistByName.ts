import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Playlist } from "@/types";

const getPlaylistByName = async (
  name: string,
  isPublic?: boolean
): Promise<Playlist[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  let data;

  if (isPublic) {
    const { data: publicData, error } = await supabase
      .from("playlists")
      .select("*, songs(*)")
      .is("public", true)
      .ilike("name", `%${name}%`);

    data = publicData;

    if (error) {
      console.log(error.message);
    }
  } else {
    const { data: privateData, error } = await supabase
      .from("playlists")
      .select("*, songs(*)")
      .eq("user_id", sessionData.session?.user.id)
      .is("public", false)
      .ilike("name", `%${name}%`);

    data = privateData;

    if (error) {
      console.log(error.message);
    }
  }

  return (data as any) || [];
};

export default getPlaylistByName;
