import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

const getSongs = async (limit?: number): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  let query = supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};

export default getSongs;
