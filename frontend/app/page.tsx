"use client";
import Image from "next/image";
import { useState } from "react";
import ControlPanel from "./components/control-panel";

export default function Home() {
  const [loadingNFTs, setLoadingNFTs] = useState<boolean>(false);

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
            <ControlPanel
              loading={loadingNFTs}
              handleLoading={setLoadingNFTs}
            />
          )}
        </div>
      </div>
    </div>
  );
}
