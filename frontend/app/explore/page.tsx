import Image from "next/image";
import HeaderExplorer from "@/components/header-explorer";

export default async function NFTs() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();

  return (
    <div className="bg-black top-0 left-0 z-30 h-screen w-screen">
      <HeaderExplorer />
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {data.results.map((item: any) => (
          <Image
            key={item.id}
            src={item.image}
            alt={item.name}
            height={300}
            width={300}
            className="border-8 border-white peer-checked:border-green-1 peer-focus:border-blue-400"
          />
        ))}
      </div>
    </div>
  );
}
