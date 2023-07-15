import Image from "next/image";
import sendNFTs from "../../actions/send-nfts";
import Header from "../../components/header";
import SubmitArrowIcon from "../../icons/submit-arrow";

export default async function NFTs({
  params: { wallet },
}: {
  params: { wallet: string };
}) {
  console.log(wallet);
  const res = await fetch(
    `https://flowcapacitor.fly.dev/get_nfts?eth_address=${wallet}`
  );
  const data = (await res.json()) as {
    token_id: string;
    image_thumbnail_url: string;
    image_url: string;
    name: string;
  }[];

  return (
    <div className="flex flex-col gap-8 min-h-screen">
      <Header title="Select up to 3 nfts" wallet="0xa62d...3178" />
      <p className="text-lg text-white text-center -mt-14 mb-10">
        Don’t worry, the Flow capacitor is non-custodial and will not burn your
        existing NFTs.
      </p>
      <form action={sendNFTs} className="flex flex-col gap-8 mb-10">
        <div className="flex flex-wrap w-full gap-4 justify-center">
          {data
            .filter(
              (d) =>
                d &&
                d.name &&
                (d.image_thumbnail_url || d.image_url) &&
                d.token_id
            )
            .map((item) => (
              <label htmlFor={`nft-${item.token_id}`} key={item.token_id}>
                <input
                  type="checkbox"
                  name={`nft-${item.token_id}`}
                  id={`nft-${item.token_id}`}
                  value={item.token_id}
                  className="peer hidden"
                />
                <Image
                  src={item.image_thumbnail_url || item.image_url}
                  alt={item.name}
                  height={300}
                  width={300}
                  className="cursor-pointer border-8 border-white peer-checked:border-green-1 peer-focus:border-blue-400"
                />
              </label>
            ))}
        </div>
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
