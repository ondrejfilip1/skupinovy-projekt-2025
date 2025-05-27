import Header from "@/components/Header";
import React, { Fragment, useEffect, useState } from "react";
import croppedQr from "@/assets/qr1.svg";
import qr2 from "@/assets/qr2.svg";
import Loading from "@/components/Loading";
import { getPaymentIntent } from "@/models/Stripe";
import moment from "moment";
import { cn } from "@/lib/utils";


export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [paymentsLocal, setPaymentsLocal] = useState(
    JSON.parse(localStorage.getItem("payments"))
  );

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    if (paymentsLocal) {
      const paymentsArray = [];
      for (const item of paymentsLocal) {
        const data = await getPayment(item.paymentIntent);
        paymentsArray.push(data);
      }
      setPayments(paymentsArray);
    }
    setLoaded(true);
  };

  const getPayment = async (paymentId) => {
    console.log(
      JSON.parse(JSON.parse(localStorage.getItem("payments"))[0].cart)
    );
    const data = await getPaymentIntent(paymentId);
    console.log(data.paymentIntent);
    if (data.status === 200) return data;
    else return null;
  };

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
      <div className="min_h_screen_fix border_main">
        <div
          className={cn(
            "min_h_screen_fix max-h-full border_main_child relative",
            payments && payments.length > 0
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
          <h1 class="text-center text-4xl mb-6">Historie plateb</h1>
          {payments.length > 0 ? (
            <>
              {payments
                .sort(
                  (a, b) => b.paymentIntent.created - a.paymentIntent.created
                )
                .map((item, index) => {
                  return (
                    <Fragment key={item.paymentIntent.id}>
                      <div className="my-6 flex items-center mx-12 relative">
                        <div className="w-1/2 sm:mr-0 mr-4">
                          <div className="text-xl">ID Platby</div>
                          <div className="font-normal text-sm mb-2">
                            {item.paymentIntent.id}
                          </div>
                          <div className="text-xl">Částka</div>
                          <div className="font-normal text-sm mb-2">
                            {`${
                              item.paymentIntent.amount / 100
                            } ${item.paymentIntent.currency.toUpperCase()}`}
                          </div>
                        </div>
                        <div className="w-1/2">
                          <div className="text-xl">Datum</div>
                          <div className="font-normal text-sm mb-2">
                            {moment(item.paymentIntent.created * 1000)
                              .locale("cz")
                              .format("DD.MM.YYYY HH:mm")}
                          </div>
                          <div className="text-xl">Stav</div>
                          <div className="font-normal text-sm">
                            {item.paymentIntent.status === "succeeded"
                              ? "Úspěšný"
                              : "Neproběhlo"}
                          </div>
                        </div>
                      </div>
                      <div className="background_text h-[1px] mx-12 opacity-50" />
                    </Fragment>
                  );
                })}
            </>
          ) : (
            <div className="m-auto text-center text-2xl">
              Historie plateb je prázdná
            </div>
          )}

          <div className="h-16" />
        </div>
      </div>
    </>
  );
}
