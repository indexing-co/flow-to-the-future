import Image from "next/image";
import Link from "next/link";
import ArrowLeft from "../icons/arrow-left";

export default function Header({
  title,
  wallet,
  backBtnLink,
}: {
  title?: string;
  backBtnLink?: string;
  wallet?: string;
}) {
  if (wallet) {
    return (
      <header className="grid grid-cols-3 text-white p-10 w-full">
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
        <h1 className="text-3xl uppercase font-bold tracking-widest text-center place-self-center">
          {title}
        </h1>
        <div className="flex items-center border py-2 px-4 rounded gap-4 place-self-end">
          <Image
            src={"/images/wallet.png"}
            alt={wallet || ""}
            width={52}
            height={40}
          />
          {wallet}
        </div>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center w-full p-10">
      <Link href={"/"}>
        <Image
          src={"/images/logo.png"}
          width={301}
          height={92}
          alt="Mint to the future"
        />
      </Link>
      <Link href={"#"} className="font-bold text-lg text-white">
        Explore other nfts
      </Link>
    </header>
  );
}
