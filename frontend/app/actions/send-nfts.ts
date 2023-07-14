"use server";
import { redirect } from "next/navigation";

export default async function sendNFTs(formData: any) {
  console.log(formData);

  redirect("/future");
}
