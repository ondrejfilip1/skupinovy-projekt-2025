import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Logo from "@/assets/logo.png";

import React from "react";

export default function Home() {
  const [value, setValue] = useState(0);
  const [showPage, setShowPage] = useState(false);
  const PERCENTAGE = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setValue(PERCENTAGE[index]);
      index++;
      if (index === PERCENTAGE.length) {
        clearInterval(interval);
        setTimeout(() => setShowPage(true), 1000);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const checkValue = () => {
    if (value < 100) {
      return (
        "LOADING"
      );
    } else {
      return (
        "DOWNLOADED"
      );
    }
  };


  const renderLoading = () => {
    if (!showPage) {
        return (
          <div className="mx-4 flex justify-center flex-col min-h-screen">
            <div className="flex items-center flex-col">
              <h2 className="tracking-widest text-3xl font-bold">{checkValue()}</h2>
            </div>
            <div className="text-xs text-[0.6rem] my-2">
              CUSTOM GLITCHES ON UI MAY APPEAR. BASED ON THIS ANALYSIS.
              <br />
              DOCUMENT/D/8b547b967cc90266ddc55d7ddc36567f
              <br />
              TYPE: CYBERSPACE
            </div>
            <div className="border-1 border-white p-1 border_color">
              <Progress value={value} />
            </div>
          </div>
        );
    } else {
      return (
        <>
              <Header />

              <Footer />
        </>
      );
    }
  };

  return (
    <>
      {renderLoading()}
    </>
  );
}
