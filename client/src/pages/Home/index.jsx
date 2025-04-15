import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import croppedQr from "@/assets/qr1.svg";

import React from "react";

export default function Home() {
  return (
    <>
      <Header />
      <div className="min_h_screen_fix border_main">
        <div className="min_h_screen_fix border_main_child relative">
          <div className="text-xs absolute -left-13.5 top-30 -rotate-90">
            NIGHTGRID PROTOCOL 0.2.1
          </div>
          <div className="text-xs absolute left-1.5 bottom-1.5 text-[0.6rem]">
            CUSTOM GLITCHES ON UI MAY APPEAR. BASED ON THIS ANALYSIS.
            <br />
            DOCUMENT/D/8b547b967cc90266ddc55d7ddc36567f
            <br />
            TYPE: CYBERSPACE
          </div>
          <img
            src={croppedQr}
            alt="qr1"
            className="absolute left-1/2 transform -translate-x-1/2 top-1.5"
          />
          {/* 
          <Link to={"/add-car"}>
            <p>Add car</p>
          </Link>

          <Link to={"/view-cars"}>
            <p>View car</p>
          </Link>*/}
        </div>
      </div>
      <Footer />
    </>
  );
}
