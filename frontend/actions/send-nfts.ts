"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function sendNFTs(formData: any) {
  const res = await fetch("https://flowcapacitor.fly.dev/submit_nfts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eth_address: formData.get("eth_address"),
      nft_ids: formData.getAll("nft_ids[]"),
    }),
  });

  const image = await res.json();

  cookies().set("image", image.image_url);

  redirect(`/future`);
}
