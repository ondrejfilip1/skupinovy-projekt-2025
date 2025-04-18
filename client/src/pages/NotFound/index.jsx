import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import croppedQr from "@/assets/qr1.svg";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import React from "react";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min_h_screen_fix border_main">
        <div className="min_h_screen_fix border_main_child flex justify-between items-center flex-col">
          <div className="text-xs absolute -left-13.5 top-30 -rotate-90 z-10">
            NIGHTGRID PROTOCOL 0.2.1
          </div>
          <div className="text-xs absolute left-1.5 bottom-1.5 text-[0.6rem] z-10">
            CUSTOM GLITCHES ON UI MAY APPEAR. BASED ON THIS ANALYSIS.
            <br />
            DOCUMENT/D/8b547b967cc90266ddc55d7ddc36567f
            <br />
            TYPE: CYBERSPACE
          </div>
          <img
            draggable={false}
            src={croppedQr}
            alt="qr1"
            className="absolute left-1/2 transform -translate-x-1/2 top-1.5 z-10"
          />
          <div className="text-xs text-[0.6rem] absolute right-1 transform top-1.5 z-10">
            <img draggable={false} src={qr2} alt="qr2" className="w-14" />
            <div className="scale-x-125 w-fit ml-[7px]">
            PROTOCOL
            <br />
            6520-A44</div>
          </div>
          <div className="text-center m-auto">
            <div className="text-6xl">404</div>
            <div className="text-xl font-medium">Nenalezeno</div>
            <Link to="/">
              <Button
                className="text-xl button_hover button_cyberpunk !py-5 mt-5"
                variant="ghost"
              >
                <ArrowUpRight />
                Zpět na hlavní stránku
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
