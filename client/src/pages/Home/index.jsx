import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { PowerGlitch } from "powerglitch";
import { Link } from "react-router-dom";
import { Menu, Clapperboard, Users, History, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Logo from "/home/logo.svg";

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
          <div className="relative w-full">
            <div className="absolute top-0 left-0 w-full flex justify-between items-center py-4 z-50">
              <div className="bg-black w-[300px] pr-13 py-4 clip-slanted">
                <img src={Logo} alt="" className="sm:w-[250px]" />
              </div>
              <div className="flex justify-around w-[400px]">
                <Link to={"/hry"}>
                  <Button
                    className="text-3xl font-semibold button_hover button_cyberpunk !py-5"
                    variant="ghost"
                    id="hover"
                  >
                    <p className="md:block hidden" id="hover">
                      Hry
                    </p>
                  </Button>
                </Link>
                <Link to={"/kosik"}>
                  <Button
                    className="text-3xl font-semibold button_hover button_cyberpunk !py-5"
                    variant="ghost"
                    id="hover"
                  >
                    <p className="md:block hidden" id="hover">
                      Nákupní košík
                    </p>
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      className="text-3xl font-semibold button_hover button_cyberpunk !py-5"
                      variant="ghost"
                      id="hover"
                    >
                      <Menu className="w-32" />
                      <p className="md:block hidden" id="hover">
                        Účet
                      </p>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="button_cyberpunk background_text border-none text-black">
                    <DropdownMenuLabel className="text-xl">
                      Váš účet
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-black mx-2" />
                    <Link to="/pribehy">
                      <DropdownMenuItem
                        className="text-xl background_hover_darker"
                        id="hover"
                      >
                        <Clapperboard className="text-black" />
                        Příběhy
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="text-xl background_hover_darker"
                      id="hover"
                    >
                      <Users className="text-black" />
                      Postavy
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-xl background_hover_darker"
                      id="hover"
                    >
                      <History className="text-black" />
                      Historie plateb
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-xl background_hover_darker"
                      id="hover"
                    >
                      <Settings className="text-black" />
                      Nastavení
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col-reverse justify-center items-end h-[98vh] w-full bg-[url(/home/background3.png)] bg-center bg-cover bg-no-repeat overflow-x-hidden">
            <div className="font-bold flex flex-col items-center align-bottom mx-auto sm:mb-5 mb-0">
              <div>
                <h1 className="text_text background_bg tracking-widest md:w-[700px] w-[80vw] py-4 text-center sm:text-6xl text-4xl mb-4">
                  WELCOME TO THE <br /> NIGHTGRID
                </h1>
              </div>
              <div>
                <Button className="button_cyberpunk py-6 px-12 font-bold sm:text-3xl text-xl bg-[#d0ff57] text-[#1a1019]">
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
