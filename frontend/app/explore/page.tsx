import Image from "next/image";
import * as fcl from "@onflow/fcl";
import HeaderExplorer from "@/components/header-explorer";

export const revalidate = 10; // reset cache every 60 seconds

export default async function NFTs() {
  fcl.config.put("accessNode.api", "https://rest-testnet.onflow.org");

  const encodedIds = await fcl.send([
    fcl.script`
    import FlowCapacitorContract from 0x5ddebd0780c440d4
    pub fun main() : [UInt64] {
      let contract = getAccount(0x5ddebd0780c440d4)
      let capability = contract.getCapability<&{FlowCapacitorContract.NFTReceiver}>(/public/NFTReceiver)

      let receiverRef = capability.borrow() ?? panic("Could not borrow the receiver reference")

      return receiverRef.getIDs()
    }
    `,
  ]);
  const decodedIds = (await fcl.decode(encodedIds)) as string[];

  const encodedMetadatas = (await Promise.all(
    decodedIds.map((did) =>
      fcl.send([
        fcl.script`
    import FlowCapacitorContract from 0x5ddebd0780c440d4
    pub fun main() : { String : String } {
      let contract = getAccount(0x5ddebd0780c440d4)
      let capability = contract.getCapability<&{FlowCapacitorContract.NFTReceiver}>(/public/NFTReceiver)

      let receiverRef = capability.borrow() ?? panic("Could not borrow the receiver reference")

      return receiverRef.getMetadata(id: ${did})
    }
    `,
      ])
    )
  )) as any[];
  const decodedMetadatas = (await Promise.all(
    encodedMetadatas.map((em) => fcl.decode(em))
  )) as {
    image_url: string;
    prompt: string;
  }[];

  return (
    <div className="bg-black top-0 left-0 z-30 h-screen w-screen">
      <HeaderExplorer />
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {decodedMetadatas.map((item) => (
          <Image
            key={item.image_url}
            src={item.image_url}
            alt={item.prompt}
            height={300}
            width={300}
            className="border-8 border-white peer-checked:border-green-1 peer-focus:border-blue-400"
          />
        ))}
      </div>
    </div>
  );
}
