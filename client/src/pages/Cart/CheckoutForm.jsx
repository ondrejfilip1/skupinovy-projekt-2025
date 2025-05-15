import { PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CornerUpLeft } from "lucide-react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error")
      setMessage(error.message);
    else setMessage("An unexpected error occured.");

    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="mx-12 my-6"
    >
      <AddressElement options={{ mode: "shipping" }} />
      <PaymentElement id="payment-element" />
      <div className="flex justify-between items-center">
        <Link to="/kosik">
          <div className="background_text p-[1px] button_cyberpunk w-fit my-6">
            <Button className="button_cyberpunk background_bg relative text_text !text-xl py-6 px-4 focus:outline-none border-none focus-visible:border-ring focus-visible:ring-ring/0 focus-visible:ring-[0px]">
              <CornerUpLeft />Zpět
            </Button>
          </div>
        </Link>
        <div className="background_text p-[1px] button_cyberpunk w-fit my-6">
          <Button
            disabled={isProcessing || !stripe || !elements}
            id="submit"
            className="button_cyberpunk background_bg relative text_text !text-xl py-6 px-4 focus:outline-none border-none focus-visible:border-ring focus-visible:ring-ring/0 focus-visible:ring-[0px]"
          >
            <span id="button-text">
              {isProcessing ? "Zpracovává se... " : "Zaplatit"}
            </span>
          </Button>
        </div>
      </div>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
