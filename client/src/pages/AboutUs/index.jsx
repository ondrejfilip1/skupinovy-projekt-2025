import Header from "@/components/Header";
import croppedQr from "@/assets/qr1.svg";
import { motion } from "motion/react";
import Background from "@/assets/about/background.png";
import qr2 from "@/assets/qr2.svg";
import Divider from "./Divider";
import { useEffect, useState } from "react";
import { PowerGlitch } from "powerglitch";

export default function AboutUs() {
  const [click, setClick] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setClick(true);
    }, 1000);
  }, []);

  useEffect(() => {
    PowerGlitch.glitch(".glitch", {
      playMode: "hover",
      optimizeSeo: true,
      createContainers: true,
      hideOverflow: false,
      timing: {
        duration: 950,
        iterations: 1,
      },
      glitchTimeSpan: {
        start: 0,
        end: 0.24,
      },
      shake: {
        velocity: 4,
        amplitudeX: 0.2,
        amplitudeY: 0.2,
      },
      slice: {
        count: 6,
        velocity: 15,
        minHeight: 0.02,
        maxHeight: 0.15,
        hueRotate: true,
      },
      pulse: false,
    });
  }, []);

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

          <motion.img
            draggable={false}
            src={Background}
            alt="background"
            className="absolute w-full h-full aspect-video object-cover pointer-events-none user-select-none object-center mask_background_2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
          />
          <div className="p-10 flex flex-col justify-center items-center z-[1] relative min_h_screen_fix">
            <h1 className="text-center text-4xl mb-6">O nás</h1>

            <motion.div
              className={
                "w-full max-w-300 drop-shadow-lg glitch " +
                (!click ? "pointer-events-none" : "pointer-events-all")
              }
              initial={{ opacity: 0, translateY: "12px" }}
              animate={{
                opacity: 1,
                translateY: "0px",
                transition: { duration: 0.7 },
              }}
            >
              <Divider className="!w-full" number={1} flip="flip_rotate" />
              <div className="lg:text-3xl text-2xl w-fit text-center">
                Za každým velkým nápadem stojí skupina lidí, která věří, že i
                malé věci mohou mít velký dopad.
                <br />
                My jsme tým nadšenců, kteří milují kreativitu, technologie a
                tvorbu bez kompromisů.
                <br />
              </div>
              <Divider className="!w-full" />
            </motion.div>
            <motion.div
              className={
                "w-full max-w-300 drop-shadow-lg glitch " +
                (!click ? "pointer-events-none" : "pointer-events-all")
              }
              initial={{ opacity: 0, translateY: "12px" }}
              animate={{
                opacity: 1,
                translateY: "0px",
                transition: { duration: 0.7, delay: 0.2 },
              }}
            >
              <Divider className="!w-full" number={2} />
              <div className="lg:text-3xl text-2xl w-fit text-center">
                Naší vášní je vytvářet svět, který si lidé mohou nejen
                představit, ale i zažít – ať už ve formě her, designových prvků
                nebo digitálních dobrodružství. <br />
                Věříme, že každý detail se počítá a že dobrý nápad si zaslouží
                být dotažen do konce.
              </div>
              <Divider className="!w-full" flip="flip_rotate" />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
