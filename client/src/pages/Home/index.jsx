import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { PowerGlitch } from "powerglitch";
import { Link, useNavigate } from "react-router-dom";
import {
  Clapperboard,
  Users,
  History,
  Settings,
  User,
  LogOut,
  Shield,
  X,
  LogIn,
  UserPlus,
  Gamepad,
  ShoppingCart,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.png";
import ImageCard from "@/components/ImageCard";

import bundle from "/cardImages/bundle.png";
import map from "/cardImages/map.png";
import dlc from "/cardImages/dlc.png";
import game from "/cardImages/game.png";
import char1 from "/characters/character1.png";
import char2 from "/characters/character2.png";
import char3 from "/characters/character3.png";
import char4 from "/characters/character4.png";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CharacterCard from "@/components/CharacterCard";

const charactersCarousel = [
  {
    image: char1,
    name: "Nyra Flux",
    description:
      "Elitní hackerka a techno-čarodějka datových toků, která tančí mezi firewally jako duch v neonové mlze. Pro korporace je postrachem, pro podsvětí legendou.",
  },
  {
    image: char2,
    name: "Raze Vortek",
    description:
      "Bývalý pouliční gladiátor se stal žoldákem s vlastním kodexem – jeho kybernetická paže a rudé oko jsou pozůstatkem zrady, kterou nikdy nezapomene. Ve světě, kde čest nic neznamená, si ji vyryl do kovu.",
  },
  {
    image: char3,
    name: "Kade Strix",
    description:
      "Bývalý bezpečnostní důstojník megakorporace, který teď bojuje proti systému, který pomáhal budovat. Každá jeho jizva vypráví příběh o zradě, každé rozhodnutí je válkou proti vlastní minulosti.",
  },
  {
    image: char4,
    name: "Zexa Drayne",
    description:
      "Pouliční revolucionářka, vůdkyně digitálního odporu, jejíž kybernetická ruka drží víc než jen zbraň – nese jiskru změny. Její jméno šeptají mezi ruinami s nadějí i strachem.",
  },
];

export default function Home() {
  const [value, setValue] = useState(0);
  const [showPage, setShowPage] = useState(false);
  const PERCENTAGE = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const navigate = useNavigate();

  const [message, setMessage] = useState(
    localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "Nejsi přihlášen(a)"
  );

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");

    toast("Byli jste úspěšně odhlášeni.", {
      cancel: {
        label: <X className="text_text" />,
      },
    });

    setMessage("Nejsi přihlášen(a)");

    // timeout aby se dropdown stihl zavrit spravne
    setTimeout(() => {
      navigate("/hry");
    }, 100);
  };

  useEffect(() => {
    const wasLoaded = localStorage.getItem("shown");
    if (wasLoaded) {
      setShowPage(true);
    } else {
      let index = 0;
      const interval = setInterval(() => {
        setValue(PERCENTAGE[index]);
        index++;
        if (index === PERCENTAGE.length) {
          clearInterval(interval);
          setTimeout(() => {
            setShowPage(true);
            localStorage.setItem("shown", "true");
          }, 1000);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, []);

  const checkValue = () => {
    if (value < 100) {
      return "LOADING...";
    } else {
      return "DOWNLOADED";
    }
  };

  useEffect(() => {
    PowerGlitch.glitch(".glitch", {
      hideOverflow: true,
      timing: {
        duration: 950,
      },
      glitchTimeSpan: {
        start: 0.4,
      },
      shake: {
        velocity: 10,
        amplitudeX: 0.05,
        amplitudeY: 0.28,
      },
      slice: {
        count: 10,
        velocity: 10,
        minHeight: 0.06,
        maxHeight: 0.05,
      },
    });
  }, []);

  useEffect(() => {
    if (showPage) {
      PowerGlitch.glitch(".overlay-glitch", {
        hideOverflow: true,
        timing: {
          duration: 3650,
        },
        shake: {
          amplitudeX: 0.05,
          amplitudeY: 0.06,
        },
        slice: {
          count: 3,
        },
      });
      PowerGlitch.glitch(".imageCard-glitch", {
        playMode: "hover",
        hideOverflow: true,
        timing: {
          duration: 1950,
        },
        glitchTimeSpan: {
          start: 0.5,
          end: 0.7,
        },
        shake: {
          amplitudeX: 0,
          amplitudeY: 0,
        },
        slice: {
          count: 1,
        },
      });
    }
  }, [showPage]);

  const renderLoading = () => {
    if (!showPage) {
      return (
        <div className="mx-4 flex justify-center flex-col min-h-screen">
          <div className="glitch">
            <div className="flex items-center flex-col">
              <h2 className="tracking-widest text-3xl font-bold">
                {checkValue()}
              </h2>
            </div>
            <div className="text-xs text-[0.6rem] my-2">
              CUSTOM GLITCHES ON UI MAY APPEAR. BASED ON THIS ANALYSIS.
              <br />
              DOCUMENT/D/8b547b967cc90266ddc55d7ddc36567f
              <br />
              TYPE: CYBERSPACE
            </div>
            <div className="border-1 border-white p-1 border_color">
              <Progress value={value} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="relative w-full">
            <div className="absolute top-0 left-0 w-full flex justify-between items-center py-4 z-50">
              <div className="bg-black md:w-[300px] w-[220px] pr-13 py-4 clip-slanted">
                <img src={Logo} alt="logo" className="sm:w-[180px] ml-4" />
              </div>
              <div className="flex gap-1 justify-end md:w-[420px] w-[25vw] bg-black pr-10 py-4 clip-slantedv1">
                <Link to={"/hry"} className="md:block hidden">
                  <Button
                    className="text-2xl font-semibold button_hover button_cyberpunk !py-5"
                    variant="ghost"
                    id="hover"
                  >
                    <p id="hover">Hry</p>
                  </Button>
                </Link>
                <Link to={"/kosik"} className="md:block hidden">
                  <Button
                    className="text-2xl font-semibold button_hover button_cyberpunk !py-5"
                    variant="ghost"
                    id="hover"
                  >
                    <p id="hover">Nákupní košík</p>
                  </Button>
                </Link>

                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <Button
                      className="text-2xl font-semibold button_hover button_cyberpunk !py-5"
                      variant="ghost"
                      id="hover"
                    >
                      <Menu className="w-32 md:hidden block" />
                      <p className="md:block hidden" id="hover">
                        Účet
                      </p>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="button_cyberpunk background_text border-none text-black min-w-60 mr-2">
                    <DropdownMenuLabel className="text-xl flex gap-2 items-center">
                      {message && <User className="h-5" />}
                      {message}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-black mx-2" />
                    {localStorage.getItem("token") ? (
                      <>
                        <AlertDialog>
                          <AlertDialogTrigger className="w-full">
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="text-xl background_hover_darker"
                              id="hover"
                            >
                              <LogOut className="text-black" />
                              Odhlášení
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="border-none background_text p-[1px] button_cyberpunk">
                            <div className="button_cyberpunk background_bg relative text_text p-4">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Opravdu se chcete odhlásit?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text_text">
                                  Tato akce Vás odhlásí od aktualního účtu.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  className="bg-transparent border_color hover:bg-transparent text_text_hover rounded-none"
                                  id="hover"
                                >
                                  Zpět
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="background_text text_bg rounded-none"
                                  id="hover"
                                  onClick={handleLogOut}
                                >
                                  Odhlásit se
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    ) : (
                      <>
                        <Link to="/prihlaseni">
                          <DropdownMenuItem
                            className="text-xl background_hover_darker"
                            id="hover"
                          >
                            <LogIn className="text-black" />
                            Přihlášení
                          </DropdownMenuItem>
                        </Link>
                        <Link to="/registrace">
                          <DropdownMenuItem
                            className="text-xl background_hover_darker"
                            id="hover"
                          >
                            <UserPlus className="text-black" />
                            Registrace
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}

                    <DropdownMenuSeparator className="bg-black mx-2" />
                    <Link to="/pribehy">
                      <DropdownMenuItem
                        className="text-xl background_hover_darker"
                        id="hover"
                      >
                        <Clapperboard className="text-black" />
                        Příběhy
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="text-xl background_hover_darker"
                      id="hover"
                    >
                      <Users className="text-black" />
                      Postavy
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-xl background_hover_darker"
                      id="hover"
                    >
                      <History className="text-black" />
                      Historie plateb
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-xl background_hover_darker"
                      id="hover"
                    >
                      <Settings className="text-black" />
                      Nastavení
                    </DropdownMenuItem>
                    <div className="md:hidden flex flex-col">
                      <DropdownMenuSeparator className="bg-black mx-2" />
                      <Link to="/hry">
                        <DropdownMenuItem
                          className="text-xl background_hover_darker"
                          id="hover"
                        >
                          <Gamepad className="text-black" />
                          Hry
                        </DropdownMenuItem>
                      </Link>

                      <Link to="/kosik">
                        <DropdownMenuItem
                          className="text-xl background_hover_darker"
                          id="hover"
                        >
                          <ShoppingCart className="text-black" />
                          Nákupní košík
                        </DropdownMenuItem>
                      </Link>
                    </div>
                    {localStorage.getItem("isAdmin") === "true" && (
                      <>
                        <DropdownMenuSeparator className="bg-black mx-2" />
                        <Link to="/admin">
                          <DropdownMenuItem
                            className="text-xl background_hover_darker"
                            id="hover"
                          >
                            <Shield className="text-black" />
                            Admin panel
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="relative h-[105vh] w-full bg-[url(/home/background3.png)] bg-cover bg-center bg-no-repeat overflow-x-hidden">
            <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-[linear-gradient(180deg,_#0000,_#000000d4_72.46%,_#1a1019)]" />
            <div className="absolute bottom-0 w-full">
              <div className="font-bold flex flex-col items-center mx-auto mb-50 overlay-glitch">
                <h1 className="text_text background_bg tracking-widest md:w-[700px] w-[80vw] py-4 text-center sm:text-6xl text-4xl mb-4">
                  WELCOME TO THE <br /> NIGHTGRID
                </h1>
                <Link to="#news">
                  <Button
                    id="hover"
                    className="button_cyberpunk py-6 px-12 font-bold sm:text-3xl text-xl bg-[#d0ff57] hover:bg-[#cfff57c1] text-[#1a1019]"
                  >
                    START THE JOURNEY
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="grid lg:grid-cols-2 grid-cols-1 m-[22px] gap-20"
            id="news"
          >
            <div className="imageCard-glitch">
              <ImageCard
                img={bundle}
                title={
                  "Celý svět NIGHTGRID v jednom balení – připraven na jízdu?"
                }
                text={true}
              />
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
              <div className="imageCard-glitch">
                <ImageCard
                  img={map}
                  title={
                    "Síť se rozšiřuje – prozkoumej neznámé oblasti NIGHTGRID"
                  }
                />
              </div>
              <div className="imageCard-glitch">
                <ImageCard
                  img={dlc}
                  title={
                    "Moc přichází ze stínů – nové DLC pro NIGHTGRID je tady!"
                  }
                />
              </div>
              <div className="imageCard-glitch">
                <ImageCard img="/bundle/complete/1.png" />
              </div>
              <div className="imageCard-glitch">
                <ImageCard
                  img={game}
                  title={"Startujeme! NIGHTGRID odemčen pro všechny hráče"}
                />
              </div>
            </div>
          </div>

          <div className="mt-20 h-[1000px]">
            <h2 className="text-center text-4xl font-bold">Postavy</h2>
            <div className="m-[22px]">
              <div className="lg:flex justify-around hidden">
                <CharacterCard
                  img={char1}
                  name={"Nyra Flux"}
                  description={
                    "Elitní hackerka a techno-čarodějka datových toků, která tančí mezi firewally jako duch v neonové mlze. Pro korporace je postrachem, pro podsvětí legendou."
                  }
                />
                <CharacterCard
                  img={char2}
                  name={"Raze Vortek"}
                  description={
                    "Bývalý pouliční gladiátor se stal žoldákem s vlastním kodexem – jeho kybernetická paže a rudé oko jsou pozůstatkem zrady, kterou nikdy nezapomene. Ve světě, kde čest nic neznamená, si ji vyryl do kovu."
                  }
                />
                <CharacterCard
                  img={char3}
                  name={"Kade Strix"}
                  description={
                    "Bývalý bezpečnostní důstojník megakorporace, který teď bojuje proti systému, který pomáhal budovat. Každá jeho jizva vypráví příběh o zradě, každé rozhodnutí je válkou proti vlastní minulosti."
                  }
                />
                <CharacterCard
                  img={char4}
                  name={"Zexa Drayne"}
                  description={
                    "Pouliční revolucionářka, vůdkyně digitálního odporu, jejíž kybernetická ruka drží víc než jen zbraň – nese jiskru změny. Její jméno šeptají mezi ruinami s nadějí i strachem."
                  }
                />
              </div>
            </div>

            <div>
              <Carousel className="w-full h-full lg:hidden block ">
                <CarouselContent className="h-full">
                  {charactersCarousel.map((image, index) => (
                    <CarouselItem key={index} className="flex justify-center relative">
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger>
                          <img
                            src={image.image}
                            alt={image.name}
                            className="object-cover h-[60vh]"
                          />
                          <p className="text-3xl text-center my-5 button_cyberpunk w-[45vw] mx-auto px-2 bg-[#d0ff57] text-[#1a1019]">
                            {image.name}
                          </p>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="button_cyberpunkv1 background_text border-none text-black w-[45vw] lg:hidden block"
                          avoidCollisions={false}
                        >
                          <p className="description text-lg p-2">
                            {image.description}
                          </p>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute -bottom-2 left-1/2 mt-10">
                  <CarouselPrevious
                    className="rounded-none button_cyberpunk background_text text_bg border-none"
                    id="hover"
                  />
                  <CarouselNext
                    className="rounded-none button_cyberpunk background_text text_bg border-none"
                    id="hover"
                  />
                </div>
              </Carousel>
            </div>
          </div>
          <Footer />
        </>
      );
    }
  };

  return <>{renderLoading()}</>;
}
