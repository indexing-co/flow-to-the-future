import { ChangeEvent, useState } from "react";
import Arrow from "../icons/arrow";
import SubmitArrowIcon from "../icons/submit-arrow";

type ControlPanelProps = {
  loading: boolean;
  handleLoading: (status: boolean) => void;
};

export default function ControlPanel({
  loading,
  handleLoading,
}: ControlPanelProps) {
  const [wallet, setWallet] = useState<string>("");

  const handleUpdateWallet = (e: ChangeEvent<HTMLInputElement>) => {
    setWallet(e.target.value);
  };

  const handleSubmitWallet = () => {
    handleLoading(true);
  };

  return (
    <>
      <div className="absolute top-72 left-24">
        <Arrow />
      </div>
      <div className="flex flex-1 bg-control-panel place-items-center bg-contain bg-no-repeat bg-center rounded w-full px-12">
        <label htmlFor="wallet-address" className="hidden">
          Add your wallet
        </label>
        <input
          type={"text"}
          onChange={handleUpdateWallet}
          className="w-3/4 bg-black/30 mx-auto mb-10 rounded px-6 py-6 text-xl outline outline-2 outline-offset-2 outline-green-1 text-white"
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
