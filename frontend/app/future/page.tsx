import Link from "next/link";
import { cookies } from "next/headers";

import GeneratedImage from "@/components/generated-image";
import Header from "@/components/header";
import CompassIcon from "@/icons/compass";
import TwitterIcon from "@/icons/twitter";
import WalletIcon from "@/icons/wallet";

export default async function Future() {
  const cookieStore = cookies();
  const image = cookieStore.get("image");

  return (
    <div className="flex flex-col gap-10 mb-10">
      <Header title="Share and Claim Your NFT" backBtnLink="/nfts" />
      <div className="flex items-center justify-center">
        {/* <pre>{JSON.stringify(image, null, 2)}</pre> */}
        <GeneratedImage image={image?.value} />
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
