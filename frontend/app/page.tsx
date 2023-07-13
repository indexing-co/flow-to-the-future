"use client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import Arrow from "./icons/arrow";
import SubmitArrowIcon from "./icons/submit-arrow";

export default function Home() {
  const [loadingNFTs, setLoadingNFTs] = useState<boolean>(false);
  const [wallet, setWallet] = useState<string>("");

  const handleUpdateWallet = (e: ChangeEvent<HTMLInputElement>) => {
    setWallet(e.target.value);
  };

  const handleSubmitWallet = () => {
    setLoadingNFTs(true);
  };

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute -z-10 w-auto min-w-full min-h-full max-w-none"
      >
        <source src={`/videos/bg.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="grid min-h-screen justify-items-center place-items-center relative w-screen text-black">
        <Image
          src={"/images/logo.png"}
          width={301}
          height={92}
          alt="Mint to the future"
          className="absolute top-8 left-4"
        />
        <div className="flex flex-col w-2/3 h-2/3 fixed">
          {loadingNFTs ? (
            <p>loading nfts...</p>
          ) : (
            <>
              <div className="absolute top-72 left-24">
                <Arrow />
              </div>
              <div className="flex flex-1 bg-control-panel place-items-center bg-contain bg-no-repeat bg-center rounded w-full px-12">
                <label htmlFor="wallet-address" className="hidden">
                  Add your wallet
                </label>
                <input
                  type={"text"}
                  onChange={handleUpdateWallet}
                  className="w-3/4 bg-black/30 mx-auto mb-10 rounded px-6 py-6 text-xl outline outline-2 outline-offset-2 outline-green-1 text-white"
                />
              </div>
              <button
                onClick={handleSubmitWallet}
                className="flex items-center gap-4 py-4 px-5 m-auto rounded border bg-black uppercase font-bold text-white transition-all hover:bg-white hover:text-black"
              >
                Start engine <SubmitArrowIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
