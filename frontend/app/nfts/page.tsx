import Image from "next/image";
import { useReducer } from "react";

export default async function NFTs() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {data.results.map((item: any) => (
        <button key={item.id} className="border-2 border-white">
          <Image src={item.image} alt={item.name} height={300} width={300} />
        </button>
      ))}
    </div>
  );
}
