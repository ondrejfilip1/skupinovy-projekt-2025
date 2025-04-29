import { CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useScramble } from "use-scramble";
import { useState } from "react";

export default function Item(props) {
  const { ref, replay } = useScramble({
    text: props.name,
    speed: 0.8,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 10,
    chance: 1,
    overdrive: false,
    overflow: true,
  });

  // kod zkopirovany zcasti z rocnikovky lol
  const addToCart = () => {
    const cartItem = {
      productId: props._id,
      amount: 1,
    };

    let a = [];
    a = JSON.parse(localStorage.getItem("cart")) || [];

    let duplicate = false;
    for (let i = 0; i < a.length; i++) {
      if (props._id === a[i].productId) {
        a[i].amount++;
        const newItems = JSON.stringify(a);
        localStorage.setItem("cart", newItems) || "[]";
        duplicate = true;
      } else if (i === a.length - 1) {
        // neni duplikat
        break;
      }
    }
    // jestli neni duplikat tak muzu normalne pridat dalsi polozku
    if (!duplicate) {
      a.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(a));
    }
  };

  return (
    <>
      <CarouselItem className="flex gap-10">
        <div className="w-1/2 p-1 h-full my-auto">
          <img
            src={`${props.imagePath}1.png`}
            alt={props.name}
            className="h-full w-full max-w-2xl mx-auto py-10 object-contain select-none"
          />
        </div>
        <div className="w-1/2 p-1 h-fit my-auto py-10 mr-10">
          <div
            className="font-medium sm:text-4xl text-2xl mb-2"
            ref={ref}
            onMouseOver={replay}
            onFocus={replay}
          />
          <div className="font-medium sm:text-lg text-md button_cyberpunk px-2 py-1 text_bg background_text inline-block mb-3">
            Kategorie: {props.category}
          </div>
          <div className="font-medium sm:text-2xl text-xl mb-2">{props.price} $</div>
          <div
            className="sm:text-lg text-sm text-justify max-h-96 overflow-y-auto pr-2"
            dangerouslySetInnerHTML={{ __html: props.description }}
          />
          <Button
            className="sm:text-lg text-md button_hover button_cyberpunk !py-5 mt-3 text_bg background_text"
            variant="ghost"
            id="hover"
            onClick={addToCart}
          >
            <ShoppingCart />
            Přidat do košíku
          </Button>
        </div>
      </CarouselItem>
    </>
  );
}
