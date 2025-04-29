import Header from "@/components/Header";
import Footer from "@/components/Footer";
import croppedQr from "@/assets/qr1.svg";
import qr2 from "@/assets/qr2.svg";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loading from "@/components/Loading";
import Item from "./Item";

import React from "react";
import { getAllGames } from "@/models/Game";

export default function Home() {
  const [games, setGames] = useState();
  const [isLoaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllGames();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setGames(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Produkt nenalezen</p>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="h_screen_fix border_main">
        <div className="h_screen_fix max-h-full border_main_child relative">
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
              6520-A44
            </div>
          </div>
          
          <Carousel className="w-full h-full transform top-1/2 -translate-y-1/2">
            <CarouselContent className="h-full">
              {games.map((item, index) => (
                <Item key={index} {...item} />
              ))}
            </CarouselContent>
            <div className="absolute bottom-10 left-1/2">
              <CarouselPrevious className="rounded-none button_cyberpunk background_text text_bg border-none" id="hover" />
              <CarouselNext className="rounded-none button_cyberpunk background_text text_bg border-none" id="hover" />
            </div>
          </Carousel>
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
