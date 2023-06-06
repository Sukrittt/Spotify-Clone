import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { BsUpload } from "react-icons/bs";

import useAuthModal from "@/hooks/Modals/useAuthModal";
import useUploadModal from "@/hooks/Modals/useUploadModal";
import { useUser } from "@/hooks/User/useUser";
import usePlaylistModal from "@/hooks/Modals/usePlaylistModal";

const OptionsDropdown = () => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const playlistModal = usePlaylistModal();

  const { user } = useUser();

  const onUploadSong = () => {
    if (!user) {
      return authModal.onOpen();
    }
    //subscription check

    return uploadModal.onOpen();
  };

  const createNewPlayList = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return playlistModal.onOpen();
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center justify-center rounded-full p-1 transition hover:bg-neutral-800 focus:outline-none">
          <AiOutlinePlus
            size={20}
            className="cursor-pointer text-neutral-400 transition"
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="box min-w-[150px] rounded-md bg-neutral-800 shadow-lg shadow-neutral-900"
          sideOffset={5}
        >
          <DropdownMenu.Item
            onClick={createNewPlayList}
            className="cursor-pointer rounded-md p-3 transition hover:bg-neutral-600 hover:outline-none"
          >
            <div className="flex gap-x-2">
              <TbPlaylist size={18} />
              <p className="truncate text-sm">Create a new playlist</p>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={onUploadSong}
            className="cursor-pointer rounded-md p-3 transition hover:bg-neutral-600 hover:outline-none"
          >
            <div className="flex gap-x-2">
              <BsUpload size={18} />
              <p className="truncate text-sm">Upload your own song</p>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default OptionsDropdown;
