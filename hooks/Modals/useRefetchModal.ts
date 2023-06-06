import { create } from "zustand";

interface RefetchModalStore {
  refetch: boolean;
  setRefetch: (prev: boolean) => void;
}

const useRefetchModal = create<RefetchModalStore>((set) => ({
  refetch: false,
  setRefetch: (prev: boolean) => set({ refetch: !prev }),
}));
export default useRefetchModal;
