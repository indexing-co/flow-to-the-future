import { create } from "zustand";

type Store = {
  wallet: string;
  selectedNFTs: number;
};

export const useStore = create<Store>()((set) => ({
  wallet: "",
  selectedNFTs: 0,
}));
