"use client";
import Link from "next/link";
import { useRef } from "react";
import TwitterIcon from "@/icons/twitter";
import ReactConfetti from "react-confetti";

export default function CongratsPanel() {
  return (
    <>
      <div className="fixed top-0 left-0 pointer-events-none w-screen h-screen overflow-hidden">
        <ReactConfetti
          numberOfPieces={1000}
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      </div>
      <div className="relative flex">
        <div className="w-2/3 m-auto">
          <h1 className="text-green-1 text-3xl uppercase font-bold tracking-widest text-center mb-8">
            Congrats on your new Flow NFT!
          </h1>
          <h2 className="text-green-1 text-2xl uppercase font-bold tracking-widest text-center mb-8">
            How to claim your NFT
          </h2>
          <p className="text-lg text-white/70 tracking-wide pb-6 text-center">
            Your NFT has been minted to a new Flow wallet. To claim access to
            your Flow wallet and new NFT, save the public and private key
            information below in a secure place.
          </p>
          <p className="text-lg text-white/70 tracking-wide pb-6 text-center">
            Using your public and private key you can set-up your Flow account
            using a supported wallet provider, such as Ledger or Blocto.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="public-key" className="text-white text-lg">
                Public key
              </label>

              <input
                type="text"
                placeholder="placeholder text"
                name=""
                id="public-key"
                className="rounded border bg-black px-4 py-2 text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="private-key" className="text-white text-lg">
                Private key
              </label>

              <input
                type="text"
                placeholder="placeholder text"
                name=""
                id="private-key"
                className="rounded border bg-black px-4 py-2 text-white"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 uppercase tracking-widest text-lg text-white">
        <Link
          href="https://twitter.com/intent/tweet?text=I just minted a free NFT on Flow! Check it out here: www.flowcapacitor.xyz"
          target="_blank"
          className="flex rounded-3xl py-4 px-12 border gap-2 items-center"
        >
          <TwitterIcon /> Share on twitter
        </Link>
        {/* <button className="flex rounded-3xl py-4 px-12 border gap-2 items-center">
          <WalletIcon /> Create flow wallet
        </button>
        <Link
          href="/explore"
          className="flex rounded-3xl py-4 px-12 border gap-2 items-center"
        >
          <CompassIcon /> Explore other nfts
        </Link> */}
      </div>
    </>
  );
}
