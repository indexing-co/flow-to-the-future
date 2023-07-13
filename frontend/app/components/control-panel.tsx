"use client";
import { useRouter } from "next/navigation";

import Arrow from "../icons/arrow";
import SubmitArrowIcon from "../icons/submit-arrow";

type ControlPanelProps = {
  loading: boolean;
  handleLoading: (status: boolean) => void;
};

export default function ControlPanel() {
  const router = useRouter();
  // const [wallet, setWallet] = useState<string>("");

  // const handleUpdateWallet = (e: ChangeEvent<HTMLInputElement>) => {
  //   setWallet(e.target.value);
  // };

  const handleSubmitWallet = () => {
    router.push("/nfts");
    // handleLoading(true);
  };

  return (
    <>
      <div className="flex flex-1 justify-center bg-control-panel place-items-center bg-contain bg-no-repeat bg-center rounded w-full px-12 relative">
        <div className="absolute bottom-[270px] -left-3">
          <Arrow />
        </div>
        <label htmlFor="wallet-address" className="hidden">
          Add your wallet
        </label>
        <input
          type={"text"}
          // onChange={handleUpdateWallet}
          className="bg-black/30 w-[95%] mb-10 rounded px-6 py-6 text-xl outline outline-2 outline-offset-2 outline-green-1 text-white"
        />
      </div>
      <button
        onClick={handleSubmitWallet}
        className="flex items-center gap-4 py-4 px-5 m-auto rounded border bg-black uppercase font-bold text-white transition-all hover:bg-white hover:text-black"
      >
        Start engine <SubmitArrowIcon />
      </button>
    </>
  );
}
