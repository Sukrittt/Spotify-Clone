import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Playlist } from "@/types";

const useLoadImage = (playlist: Playlist) => {
  const supabaseClient = useSupabaseClient();

  if (!playlist.image_path || !playlist) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(playlist.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
