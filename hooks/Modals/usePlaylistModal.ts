import { create } from "zustand";

interface PlaylistModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  songId: string;
  setSongId: (id: string) => void;
}

const usePlaylistModal = create<PlaylistModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => {
    set({ isOpen: false }), set({ songId: "" });
  },
  songId: "",
  setSongId: (id: string) => set({ songId: id }),
}));
export default usePlaylistModal;
