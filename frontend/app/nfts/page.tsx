import Image from "next/image";
import sendNFTs from "../actions/send-nfts";
import Header from "../components/header";
import SubmitArrowIcon from "../icons/submit-arrow";

export default async function NFTs() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();

  return (
    <div className="flex flex-col gap-8">
      <Header title="Select up to 3 nfts" wallet="0xa62d...3178" />
      <p className="text-lg text-white text-center -mt-14 mb-10">
        Don’t worry, the Flow capacitor is non-custodial and will not burn your
        existing NFTs.
      </p>
      <form
        action={sendNFTs}
        className="flex flex-wrap gap-4 justify-center mb-10"
      >
        {data.results.map((item: any) => (
          <label htmlFor={`nft-${item.id}`} key={item.id}>
            <input
              type="checkbox"
              name={`nft-${item.id}`}
              id={`nft-${item.id}`}
              value={item.id}
              className="peer hidden"
            />
            <Image
              src={item.image}
              alt={item.name}
              height={300}
              width={300}
              className="cursor-pointer border-8 border-white peer-checked:border-green-1 peer-focus:border-blue-400"
            />
          </label>
        ))}
        <button
          type="submit"
          className="flex items-center gap-4 py-4 px-32 m-auto rounded border bg-black uppercase font-bold text-white transition-all hover:bg-white hover:text-black"
        >
          Ready, set, go <SubmitArrowIcon />
        </button>
      </form>
    </div>
  );
}
