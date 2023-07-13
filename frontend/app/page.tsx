"use client";
import { useState } from "react";
import ControlPanel from "./components/control-panel";

export default function Home() {
  return (
    <div className="flex flex-col mx-auto w-[950px] h-[700px] relative">
      <ControlPanel />
    </div>
  );
}
