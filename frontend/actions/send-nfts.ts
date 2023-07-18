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

  const json = await res.json();

  const cookieStore = cookies();
  cookieStore.set("image", json.image_url);
  cookieStore.set("address", json.address);
  cookieStore.set("private_key", json.private_key);

  redirect(`/future`);
}
