import { Link } from "react-router-dom";
import Header from "@/components/Header";
import croppedQr from "@/assets/qr1.svg";
import { ArrowUpRight, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import qr2 from "@/assets/qr2.svg";
import { useSearchParams } from "react-router-dom";
import { getPaymentIntent } from "@/models/Stripe";
import { useEffect, useState } from "react";

import React from "react";

export default function Completion() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentIntent, setPaymentIntent] = useState(
    searchParams.get("payment_intent")
  );
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getPaymentIntent(paymentIntent);


    const payments = JSON.parse(localStorage.getItem("payments")) || "";
    let doesIncludePayInt = false;
    if (payments)
      payments.map((item) => {
        doesIncludePayInt = item.paymentIntent.includes(paymentIntent);
      });
    if (!doesIncludePayInt) {
      const paymentsNew = JSON.stringify([
        ...payments,
        { paymentIntent: paymentIntent, cart: localStorage.getItem("cart") },
      ]);
      localStorage.setItem("payments", paymentsNew) || "[]";
    }


    if (data.status === 200 && data.paymentIntent.status === "succeeded")
      localStorage.removeItem("cart");
    else setInvalid(true);
  };

  if (invalid) return <div className="text-center">Neplatný odkaz</div>;

  return (
    <>
      <Header />
      <div className="h_screen_fix border_main">
        <div className="h_screen_fix max-h-full border_main_child relative flex flex-col items-center justify-center">
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
          <div className="text-center m-auto">
            <PackageCheck
              className="w-20 h-20 mx-auto mb-4"
              strokeWidth={0.5}
            />
            <div className="text-xl font-medium">Platba proběhla úspěšně</div>
            <Link to="/">
              <Button
                className="text-xl button_hover button_cyberpunk !py-5 mt-5"
                variant="ghost"
                id="hover"
              >
                <ArrowUpRight />
                Zpět na hlavní stránku
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
