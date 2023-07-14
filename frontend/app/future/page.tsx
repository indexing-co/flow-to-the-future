import Image from "next/image";
import Link from "next/link";
import Header from "../components/header";
import CompassIcon from "../icons/compass";
import TwitterIcon from "../icons/twitter";
import WalletIcon from "../icons/wallet";

export default async function Future() {
  return (
    <div className="flex flex-col gap-10 mb-10">
      <Header
        title="Share and Claim Your NFT"
        wallet="0xa62d...3178"
        backBtnLink="/nfts"
      />
      <div className="flex items-center justify-center">
        <Image
          src={"/images/nft-sample.png"}
          alt="nft generated for 0xa62d...3178"
          width={600}
          height={600}
        />
      </div>
      <div className="flex items-center justify-center gap-6 uppercase tracking-widest text-lg text-white">
        <Link
          href="#"
          className="flex rounded-3xl py-4 px-12 border gap-2 items-center"
        >
          <TwitterIcon /> Share on twitter
        </Link>
        <Link
          href="#"
          className="flex rounded-3xl py-4 px-12 border gap-2 items-center"
        >
          <WalletIcon /> Create flow wallet
        </Link>
        <Link
          href="/explore"
          className="flex rounded-3xl py-4 px-12 border gap-2 items-center"
        >
          <CompassIcon /> Explore other nfts
        </Link>
      </div>
    </div>
  );
}
