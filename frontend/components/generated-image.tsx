"use client";
import Image from "next/image";

export default function GeneratedImage({ image }: { image?: string }) {
  if (image) {
    return (
      <div className="flex flex-col">
        <Image
          src={image}
          alt="nft generated"
          width={600}
          height={600}
          className="border-8"
        />
      </div>
    );
  }

  return <p>Not possible to generate your image now.</p>;
}
