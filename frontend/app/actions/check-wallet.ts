"use server";
import { redirect } from "next/navigation";

export default async function checkWallet(formData: any) {
  console.log(formData);

  redirect("/nfts");
}
