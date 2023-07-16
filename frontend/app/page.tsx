import Image from "next/image";
import checkWallet from "../actions/check-wallet";
import Header from "@/components/header";
import Arrow from "@/icons/arrow";
import SubmitArrowIcon from "@/icons/submit-arrow";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto w-[950px] h-[700px] relative mb-16">
        <form action={checkWallet} className="flex flex-col flex-1 w-full">
          <div className="flex flex-1 justify-center place-items-center bg-control-panel bg-contain bg-no-repeat bg-center rounded px-12 relative">
            <div className="absolute bottom-[270px] -left-3">
              <Arrow />
            </div>
            <label htmlFor="wallet-address" className="hidden">
              Add your wallet
            </label>
            <input
              required
              // autoComplete="off"
              name="wallet"
              className="bg-black/30 w-[95%] mb-10 rounded px-6 py-6 text-xl outline outline-2 outline-offset-2 outline-green-1 text-white"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-4 py-4 px-5 m-auto rounded border bg-black uppercase font-bold text-white transition-all hover:bg-white hover:text-black"
          >
            Start engine <SubmitArrowIcon />
          </button>
        </form>
      </div>
      <div className="relative flex">
        <div className="w-2/3 m-auto">
          <h1 className="text-green-1 text-3xl uppercase font-bold tracking-widest text-center mb-16">
            Help Marty McFlow
            <span className="flex justify-center items-center">
              Teleport To The Future <SubmitArrowIcon />
            </span>
          </h1>
          <p className="text-lg text-white/70 tracking-wide pb-6 text-center">
            Is your wallet full of tired NFTs from other blockchains?
          </p>
          <p className="text-lg text-white/70 tracking-wide pb-6 text-center">
            Help Marty McFlow move to a more decentralized, secure and
            innovative future by transforming your old NFTs into something
            dynamic and new.
          </p>
          <p className="text-lg text-white/70 tracking-wide pb-6 text-center">
            Inspired by your existing NFT metadata and leveraging AI image
            generation, the Flow Capacitor will create fresh and exciting NFTs
            on the Flow blockchain.
          </p>
          <p className="text-lg text-white/70 tracking-wide pb-6 text-center">
            Don’t have a Flow wallet yet? No worries! The Flow Capacitor will
            automatically generate your NFT and hold on to it until you are
            ready for it to be transferred to your new Flow wallet.
          </p>
          <p className="text-lg text-white/70 tracking-wide pb-6 text-center">
            High transaction fees? Where we’re going we don’t need high
            transaction fees!
          </p>
          <p className="text-lg text-white/70 tracking-wide pb-6 text-center">
            Don’t be a Biff!
          </p>
          <p className="text-lg text-white/70 tracking-wide pb-6 text-center">
            Help Marty Flow To The Future!!
          </p>
        </div>
        <Image
          src={"/images/marty.png"}
          alt="Marty"
          width={275}
          height={315}
          className="absolute left-10 bottom-0"
        />
        <Image
          src={"/images/biff.png"}
          alt="Biff"
          width={210}
          height={303}
          className="absolute right-0 bottom-0"
        />
      </div>
    </>
  );
}
