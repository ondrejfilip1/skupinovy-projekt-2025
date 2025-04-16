import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import croppedQr from "@/assets/qr1.svg";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
        <p>Produkt se načítá...</p>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="h_screen_fix border_main">
        <div className="h_screen_fix border_main_child relative">
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
            draggable={false}
            src={croppedQr}
            alt="qr1"
            className="absolute left-1/2 transform -translate-x-1/2 top-1.5"
          />
          <Carousel className="w-full transform top-1/2 -translate-y-1/2">
            <CarouselContent>
              {games.map((item, index) => (
                <CarouselItem key={index} className="flex">
                  <div className="w-1/2 p-1 flex items-center justify-center">
                    <img
                      src={`${item.imagePath}1.png`}
                      alt={item.name}
                      className="h-fit w-full max-w-2xl"
                    />
                  </div>
                  <div className="w-1/2 p-1 flex items-center justify-center flex-col mr-10">
                    <div>
                      <div className="font-medium text-5xl mb-2">
                        {item.name}
                      </div>
                      <div
                        className="text-xl text-justify"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-0 left-1/2">
              <CarouselPrevious className="rounded-none button_hover button_cyberpunk" />
              <CarouselNext className="rounded-none button_hover button_cyberpunk" />
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
