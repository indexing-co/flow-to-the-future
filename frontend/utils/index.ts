"use client";

import { useStore } from "@/src/store";
import { ChangeEvent } from "react";

export const handleChangeWallet = (e: ChangeEvent<HTMLInputElement>) => {
  useStore.setState({ wallet: e.target.value });
};

export const validateAmountOfNTFs = () => {
  const nfts = document.querySelectorAll('[name="nft-item"]:checked');

  useStore.setState({ selectedNFTs: nfts.length });
};
