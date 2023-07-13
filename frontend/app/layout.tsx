import "./globals.css";
import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

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
        <div className="relative h-screen overflow-hidden">
          <video
            autoPlay
            loop
            muted
            className="absolute -z-10 w-auto min-w-full min-h-full max-w-none pointer-events-none"
          >
            <source src={`/videos/bg.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="flex flex-col gap-4 pt-32 h-screen w-screen text-black">
            <div className="fixed flex justify-between items-center top-10 w-full px-10">
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
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
