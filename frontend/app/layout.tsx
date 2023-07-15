import "./globals.css";
import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import WovnIcon from "./icons/wovn";
import IndexingIcon from "./icons/indexing-co";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Mint to the future",
  description: "Mint to the future app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={orbitron.className}>
        <video
          autoPlay
          loop
          muted
          className="fixed -z-10 w-auto min-w-full min-h-full max-w-none pointer-events-none"
        >
          <source src={`/videos/bg.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="flex flex-col gap-4 w-full text-black">{children}</div>
        <div className="flex bg-gray-900 justify-center items-center text-white py-5">
          <p className="flex gap-2 items-center justify-center">
            <span className="text-gray-700">powered by</span>{" "}
            <a href="https://www.wovn.xyz" target="_blank" rel="noreferrer">
              <WovnIcon />
            </a>
            <span className="text-gray-700">&amp;</span>
            <a href="https://www.indexing.co" target="_blank" rel="noreferrer">
              <IndexingIcon />
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
