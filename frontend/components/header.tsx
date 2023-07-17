"use client";
import Image from "next/image";
import Link from "next/link";
import ArrowLeft from "@/icons/arrow-left";

export default function Header({
  title,
  wallet,
  aboutBtn = false,
  backBtnLink,
}: {
  title?: string;
  wallet?: string;
  aboutBtn?: boolean;
  backBtnLink?: string;
}) {
  if (wallet) {
    return (
      <header className="grid grid-cols-3 text-white py-5 px-10 w-full">
        <div className="flex items-center">
          {backBtnLink && (
            <Link
              href={backBtnLink}
              className="flex items-center gap-4 uppercase"
            >
              <ArrowLeft /> bACK TO THE NFTS
            </Link>
          )}
        </div>
        <h1 className="text-3xl mt-8 uppercase font-bold tracking-widest text-center place-self-center">
          {title}
        </h1>
        {/* <div className="flex items-center border py-2 px-4 rounded gap-4 place-self-end">
          <Image
            src={"/images/wallet.png"}
            alt={wallet || ""}
            width={52}
            height={40}
          />
          {`${wallet.substring(0, 5)}...${wallet.substring(wallet.length - 5)}`}
        </div> */}
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center w-full py-5 px-10">
      <Link href={"/"}>
        <Image
          src={"/images/logo.png"}
          width={301}
          height={92}
          alt="Mint to the future"
        />
      </Link>
      <div className="flex gap-4">
        <Link
          href={"/explore"}
          className="font-bold text-lg text-green-1 backdrop-blur-lg black/40 shadow-slate-950 border border-green-1 px-4 py-3 rounded hover:bg-white hover:text-black transition uppercase"
        >
          Explore nfts
        </Link>
        {aboutBtn && (
          <Link
            href={"#about"}
            className="font-bold text-lg text-green-1 backdrop-blur-lg black/40 shadow-slate-950 border border-green-1 px-4 py-3 rounded hover:bg-white hover:text-black transition uppercase"
          >
            About
          </Link>
        )}
      </div>
    </header>
  );
}
