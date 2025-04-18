import { CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useScramble } from "use-scramble";

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

  return (
    <>
      <CarouselItem className="flex gap-10">
        <div className="w-1/2 p-1 h-full my-auto">
          <img
            src={`${props.imagePath}1.png`}
            alt={props.name}
            className="h-full w-full max-w-2xl mx-auto py-10 object-contain"
          />
        </div>
        <div className="w-1/2 p-1 h-fit my-auto py-10 mr-10">
          <div
            className="font-medium text-5xl mb-2"
            ref={ref}
            onMouseOver={replay}
            onFocus={replay}
          />
          <div className="font-medium text-xl button_cyberpunk px-2 py-1 text_bg background_text inline-block mb-3">
            Kategorie: {props.category}
          </div>
          <div className="font-medium text-3xl mb-2">{props.price} $</div>
          <div
            className="text-xl text-justify max-h-96 overflow-y-auto pr-2"
            dangerouslySetInnerHTML={{ __html: props.description }}
          />
          <Button
            className="text-xl button_hover button_cyberpunk !py-5 mt-3"
            variant="ghost"
          >
            <ShoppingCart />
            Přidat do košíku
          </Button>
        </div>
      </CarouselItem>
    </>
  );
}
