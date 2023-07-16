import Image from "next/image";

export default function LoadingComponent() {
  return (
    <div className="bg-black fixed top-0 left-0 z-30 h-screen w-screen">
      <div className="flex flex-col items-center justify-center gap-8 fixed z-30 bg-purple-gradient m-auto h-screen w-screen">
        <Image src={"/images/clock.png"} width={586} height={329} alt="clock" />
        <p className="text-center uppercase text-3xl text-white">
          <span className="block mb-4">&ldquo;Hang on, everybody.</span> The
          time circuits are activating.&ldquo;
        </p>
      </div>
    </div>
  );
}
