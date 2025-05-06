import React from "react";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import Logo from "@/assets/logo.png";

export default function HomeLoading({ setDisabled }) {
  const [value, setValue] = useState(0);
  const PERCENTAGE = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const load = () => {
    let index = 0;
    const interval = setInterval(() => {
      setValue(PERCENTAGE[index % PERCENTAGE.length]);
      if (index > PERCENTAGE.length) setDisabled(true);
      index++;
    }, 300);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div className={setDisabled == true ? "!hidden container mx-auto px-44" : "container mx-auto px-44"}>
        <div className="flex items-center flex-col">
          <img src={Logo} className="w-[300px]" alt="" />
        </div>
        <div className="text-xs text-[0.6rem] my-2">
          CUSTOM GLITCHES ON UI MAY APPEAR. BASED ON THIS ANALYSIS.
          <br />
          DOCUMENT/D/8b547b967cc90266ddc55d7ddc36567f
          <br />
          TYPE: CYBERSPACE
        </div>
        <div className="border-1 border-white p-1 border_color">
          <Progress className={""} value={value} />
        </div>
      </div>
    </>
  );
}
