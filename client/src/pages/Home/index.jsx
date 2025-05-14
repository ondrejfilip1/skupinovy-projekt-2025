import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Logo from "@/assets/logo.png";
import Game from "/game/game.png";

import React from "react";
import { PowerGlitch } from "powerglitch";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [value, setValue] = useState(0);
  const [showPage, setShowPage] = useState(false);
  const PERCENTAGE = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  useEffect(() => {
    const wasLoaded = localStorage.getItem("shown");
    if (wasLoaded) {
      setShowPage(true);
    } else {
      let index = 0;
      const interval = setInterval(() => {
        setValue(PERCENTAGE[index]);
        index++;
        if (index === PERCENTAGE.length) {
          clearInterval(interval);
          setTimeout(() => {
            setShowPage(true);
            localStorage.setItem("shown", "true");
          }, 1000);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, []);

  const checkValue = () => {
    if (value < 100) {
      return "LOADING...";
    } else {
      return "DOWNLOADED";
    }
  };

  useEffect(() => {
    PowerGlitch.glitch(".glitch", {
      hideOverflow: true,
      timing: {
        duration: 950,
      },
      glitchTimeSpan: {
        start: 0.4,
      },
      shake: {
        velocity: 10,
        amplitudeX: 0.05,
        amplitudeY: 0.28,
      },
      slice: {
        count: 10,
        velocity: 10,
        minHeight: 0.06,
        maxHeight: 0.05,
      },
    });
  }, []);

  const renderLoading = () => {
    if (!showPage) {
      return (
        <div className="mx-4 flex justify-center flex-col min-h-screen">
          <div className="glitch">
            <div className="flex items-center flex-col">
              <h2 className="tracking-widest text-3xl font-bold">
                {checkValue()}
              </h2>
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
        </div>
      );
    } else {
      return (
        <>
        <div className="border-2 bg-black text_text absolute">
          ad
        </div>
          <div className="flex sm:flex-row flex-col-reverse justify-center items-end h-[98vh] w-full bg-no-repeat bg-cover bg-[url(/background/background1.png)]">
            <div className="font-bold flex flex-col items-center align-bottom mx-auto mb-20">
              <div>
                <h1 className="text_text background_bg px-28 py-4 text-center sm:text-7xl text-3xl mb-4">
                  WELCOME TO THE <br /> NIGHTGRID
                </h1>
              </div>
              <div>
                <Button className="button_cyberpunk py-6 px-12 sm:text-3xl text-xl bg-[#d0ff57] text-[#1a1019]">
                  START THE JOURNEY
                </Button>
              </div>
            </div>
          </div>
          <Footer />
        </>
      );
    }
  };

  return <>{renderLoading()}</>;
}
