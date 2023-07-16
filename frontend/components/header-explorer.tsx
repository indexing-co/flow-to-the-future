"use client";

import CloseIcon from "@/icons/close";

const handleBackClick = () => {
  window.history.back();
};

export default function HeaderExplorer() {
  return (
    <div className="flex justify-center px-10">
      <h1 className="text-white mx-auto py-10 text-3xl uppercase font-bold tracking-widest">
        Explore
      </h1>
      <button onClick={handleBackClick}>
        <CloseIcon />
      </button>
    </div>
  );
}
