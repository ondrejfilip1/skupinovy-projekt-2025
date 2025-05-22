import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PowerGlitch } from "powerglitch";

export default function CharacterCard({ img, name, description }) {
  useEffect(() => {
    PowerGlitch.glitch(".image-glitch", {
      playMode: "click",
      hideOverflow: true,
      timing: {
        duration: 1950,
      },
      glitchTimeSpan: {
        start: 0,
        end: 0.4,
      },
      shake: {
        amplitudeX: 0,
        amplitudeY: 0,
      },
      slice: {
        count: 1,
      },
    });
  }, []);

  return (
    <>
      <div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <img
              src={img}
              id="hover"
              alt=""
              className="object-contain image-glitch max-h-[55vh] "
            />
            <p className="text-3xl text-center my-4 !mb-2 button_cyberpunk w-[13vw] mx-auto px-2 bg-[#d0ff57] text-[#1a1019]">
              {name}
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="button_cyberpunkv1 background_text border-none text-black w-[20vw] lg:block hidden" avoidCollisions={false}>
            <p className="description text-lg p-2">{description}</p>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
