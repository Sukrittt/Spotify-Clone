import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  volume: number;
  setVolume: (value: number) => void;
  shuffle: boolean;
  setShuffle: (prev: boolean) => void;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  volume: 1,
  setVolume: (value: number) => set({ volume: value }),
  shuffle: false,
  setShuffle: (prev: boolean) => set({ shuffle: !prev }),
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;
