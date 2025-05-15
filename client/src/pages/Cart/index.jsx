import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import croppedQr from "@/assets/qr1.svg";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import qr2 from "@/assets/qr2.svg";
import { Link } from "react-router-dom";
import CartBox from "./CartBox";
import { cn } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent, getPublicKey } from "@/models/Stripe";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

export default function Cart() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  useEffect(() => {
    const reloadCart = () => {
      setCart(JSON.parse(localStorage.getItem("cart")));
    };

    window.addEventListener("reloadCart", reloadCart);

    loadStripeFunc();
  }, []);

  const loadStripeFunc = async () => {
    if (!cart || cart.length === 0) return;

    const stripePaymentIntent = await createPaymentIntent(cart);
    if (stripePaymentIntent.status === 200)
      setClientSecret(stripePaymentIntent.clientSecret);

    const stripeConfig = await getPublicKey();
    if (stripeConfig.status === 200)
      setStripePromise(loadStripe(stripeConfig.publishableKey));
  };

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
              {cart.map((value, index) => (
                <CartBox
                  {...value}
                  key={`${value.productId}-${index}`}
                  index={index}
                />
              ))}
              {clientSecret && stripePromise && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: clientSecret,
                    fonts: [
                      {
                        cssSrc:
                          "https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap",
                      },
                    ],
                    appearance: {
                      variables: {
                        colorPrimary: "#d0ff57",
                        spacingUnit: "4px",
                        colorText: "#d0ff57",
                        colorBackground: "#1a1019",
                        fontFamily: "Rajdhani",
                        borderRadius: "0px",
                      },
                    },
                  }}
                >
                  <CheckoutForm />
                </Elements>
              )}
            </>
          ) : (
            <div className="m-auto text-center text-2xl">Košík je prázdný</div>
          )}
          <div className="h-16" />
        </div>
      </div>
      <Footer />
    </>
  );
}
