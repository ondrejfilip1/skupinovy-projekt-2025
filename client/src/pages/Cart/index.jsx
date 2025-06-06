import { useState, useEffect } from "react";
import Header from "@/components/Header";
import croppedQr from "@/assets/qr1.svg";
import qr2 from "@/assets/qr2.svg";
import CartBox from "./CartBox";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CornerUpRight } from "lucide-react";

export default function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const reloadCart = () => {
      setCart(JSON.parse(localStorage.getItem("cart")));
    };

    window.addEventListener("reloadCart", reloadCart);
  }, []);

  const [prices, setPrices] = useState([]);

  // insane kod na pocitani celkove castky (bez ai)
  const handlePrice = (priceObject) => {
    let copy;
    prices.map((value, index) => {
      // jestli se id shoduje
      if (value.productId === priceObject.productId) {
        // zkopiruju prices
        copy = [...prices];
        // normalni vypocet
        if (priceObject.price) copy[index] = priceObject;
        // vymazani
        else copy.splice(index, 1);
      }
    });

    // jestli je duplikat
    if (copy) setPrices(copy);
    // jestli neni duplikat
    else setPrices((old) => [...old, priceObject]);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    prices.map((value) => {
      total += value.price;
    });
    //console.log(total);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [prices]);

  return (
    <>
      <Header />
      <div className="min_h_screen_fix border_main">
        <div
          className={cn(
            "min_h_screen_fix max-h-full border_main_child relative",
            cart && cart.length > 0
              ? ""
              : "flex flex-col justify-center items-center"
          )}
        >
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
          <div className="h-8" />
          {cart && cart.length > 0 ? (
            <>
              <div className="my-2">
                <h1 className="text-center text-4xl mb-6">Nákupní košík</h1>
              </div>
              {cart.map((value, index) => (
                <CartBox
                  {...value}
                  key={`${value.productId}-${index}`}
                  index={index}
                  priceObject={handlePrice}
                />
              ))}
              <div className="flex justify-between items-center mx-12 my-6">
                <div>
                  <div className="text-2xl">Celkem: {totalPrice} $</div>
                  <div>Celkem bez dph: {Math.round(totalPrice / 1.21)} $</div>
                </div>
                <Link to="/platba">
                  <div className="background_text p-[1px] button_cyberpunk w-fit my-6">
                    <Button
                      id="hover"
                      className="button_cyberpunk background_bg relative text_text !text-xl py-6 px-4 focus:outline-none border-none focus-visible:border-ring focus-visible:ring-ring/0 focus-visible:ring-[0px]"
                    >
                      Pokračovat k platbě
                      <CornerUpRight />
                    </Button>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <div className="m-auto text-center text-2xl">Košík je prázdný</div>
          )}

          <div className="h-16" />
        </div>
      </div>
    </>
  );
}
