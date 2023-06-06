import { Song } from "@/types";

import usePlayer from "@/hooks/Player/usePlayer";
import useAuthModal from "@/hooks/Modals/useAuthModal";
import { useUser } from "@/hooks/User/useUser";

const useOnPlay = (songs: Song[]) => {
  const { user } = useUser();

  const player = usePlayer();
  const authModal = useAuthModal();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
