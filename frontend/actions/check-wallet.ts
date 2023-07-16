"use server";
import { redirect } from "next/navigation";

export default async function checkWallet(formData: any) {
  redirect(`/nfts/${formData.get("wallet")}`);
}
