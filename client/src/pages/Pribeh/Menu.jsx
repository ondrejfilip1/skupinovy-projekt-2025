import Header from "@/components/Header";
import croppedQr from "@/assets/qr1.svg";
import { Button } from "@/components/ui/button";
import qr2 from "@/assets/qr2.svg";
import { Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import StoryItem from "./StoryItem";

export default function Menu() {
  const [stories, setStories] = useState(
    JSON.parse(localStorage.getItem("stories")) || []
  );

  window.addEventListener("storiesUpdate", () => {
    setStories(JSON.parse(localStorage.getItem("stories")));
  });

  return (
    <>
      <Header />
      <div className="min_h_screen_fix border_main">
        <div className="min_h_screen_fix max-h-full border_main_child relative">
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

          <div className="m-10">
            {stories && stories.length > 0 ? (
              <>
                <h1 className="text-center text-4xl mb-6">Vaše příběhy</h1>
                <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-6">
                  {stories.map((value, index) => (
                    <StoryItem {...value} key={index} index={index} />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-between items-center my-24 pt-4 gap-6">
                <h1 className="text-center text-4xl">Nemáte žádné příběhy</h1>
                <Clapperboard className="w-12 h-12" />
              </div>
            )}

            <div className="background_text my-6 h-[1px]" />
            <Link to="/pribeh">
              <div className="background_text p-[1px] button_cyberpunk w-fit mb-16">
                <Button
                  id="hover"
                  className="button_cyberpunk background_bg relative text_text !text-xl py-6 px-4 focus:outline-none border-none focus-visible:border-ring focus-visible:ring-ring/0 focus-visible:ring-[0px]"
                >
                  Vytvořit nový příběh
                  <Clapperboard />
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
