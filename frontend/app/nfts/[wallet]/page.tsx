import NFTGallery from "@/components/nft-gallery";
import { NFTs } from "@/types/nfts";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";

export default async function NFTs({
  params: { wallet },
}: {
  params: { wallet: string };
}) {
  const res = await fetch(
    `https://flowcapacitor.fly.dev/get_nfts?eth_address=${wallet}`
  );

  const data = res.ok ? ((await res.json()) as NFTs[]) : null;

  const nfts = data?.length
    ? data.filter(
        (d) =>
          d && d.name && (d.image_thumbnail_url || d.image_url) && d.token_id
      )
    : [];

  return (
    <div className="flex flex-col gap-8 min-h-screen">
      {data ? (
        <>
          <Header title="Select up to 3 nfts" wallet={wallet} />
          <p className="text-lg text-white text-center -mt-3 mb-10">
            Don’t worry, the Flow capacitor is non-custodial and will not burn
            your existing NFTs.
          </p>
          <NFTGallery nfts={nfts} wallet={wallet} />
        </>
      ) : (
        <>
          <Header />
          <div className="flex flex-col items-center gap-4 justify-center text-white">
            <Image src="/images/biff.png" alt="Biff" width={210} height={303} />
            <p>Your wallet is either incorrect or has no NTFs</p>
            <Link href="/" className="text-lg text-white underline">
              Try again
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
