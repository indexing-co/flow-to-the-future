"use client";
import Image from "next/image";
import { useState } from "react";
import sendNFTs from "@/actions/send-nfts";
import SubmitArrowIcon from "@/icons/submit-arrow";
import { NFTs } from "@/types/nfts";
import LoadingComponent from "./loading";

export default function NFTGallery({
  nfts,
  wallet,
}: {
  nfts: NFTs[];
  wallet: string;
}) {
  const [loading, setLoading] = useState(false);
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);

  const handleAddNFTs = (tokenId: string) => {
    if (selectedNFTs.includes(tokenId)) {
      setSelectedNFTs((prevState) =>
        prevState.filter((item) => item !== tokenId)
      );
    } else {
      setSelectedNFTs((prevState) => [...prevState, tokenId]);
    }
  };

  const handleFormSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      // Remove loading if takes more than 20s
      setLoading(false);
    }, 20000);
  };

  return (
    <>
      {loading && <LoadingComponent />}
      <form
        action={sendNFTs}
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-8 mb-10"
      >
        <input type="hidden" name="eth_address" value={wallet} />
        <div className="flex flex-wrap w-full gap-4 justify-center pb-28">
          {nfts.map((item) => (
            <label
              htmlFor={`nft-${item.token_id}`}
              key={item.token_id + item.image_url}
            >
              <input
                type="checkbox"
                name="nft_ids[]"
                id={`nft-${item.token_id}`}
                value={item.token_id}
                className="peer hidden"
                onChange={() => handleAddNFTs(item.token_id)}
              />
              <Image
                src={item.image_thumbnail_url || item.image_url}
                alt={item.name}
                height={300}
                width={300}
                className="cursor-pointer border-8 border-white peer-checked:border-green-1 peer-focus:border-blue-400"
              />
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-3 w-full fixed bottom-20">
          {selectedNFTs.length === 0 ||
            (selectedNFTs.length > 3 && (
              <p className="bg-black p-3 text-red-400 text-lg font-bold mx-auto">
                Please select up to 3
              </p>
            ))}
          <button
            type="submit"
            disabled={selectedNFTs.length === 0 || selectedNFTs.length > 3}
            className="flex items-center gap-4 py-4 px-32 m-auto rounded border bg-black uppercase font-bold text-white transition-all hover:bg-white hover:text-black disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            Ready, set, go <SubmitArrowIcon />
          </button>
        </div>
      </form>
    </>
  );
}
