import { cookies } from "next/headers";

import GeneratedImage from "@/components/generated-image";
import Header from "@/components/header";
import CongratsPanel from "@/components/congrats-panel";

export default async function Future() {
  const cookieStore = cookies();
  const image = cookieStore.get("image");
  const address = cookieStore.get("address");
  const privateKey = cookieStore.get("private_key");

  return (
    <div className="flex flex-col gap-10 mb-10">
      <Header
        aboutBtn={false}
        title="Share and Claim Your NFT"
        backBtnLink="/nfts"
      />
      <div className="flex items-center justify-center">
        <GeneratedImage image={image?.value} />
      </div>
      <CongratsPanel
        address={address?.value || ""}
        privateKey={privateKey?.value || ""}
      />
    </div>
  );
}
