import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
} from "lucide-react";
import { FaDiscord, FaRedditAlien } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "@/assets/logo.png";

import Divider from "../Divider";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <>
      <Divider />
      <div className="mx-[22px] mb-[22px]">
        <div className="flex lg:flex-row flex-col justify-between ">
          <div>
            <img
              src={Logo}
              alt="Logo"
              className="mb-4 lg:w-[300px] w-[200px] mx-auto lg:pl-5 pr-0 "
            />
          </div>

          <div className="flex flex-col gap-y-3 lg:text-justify text-center lg:mx-0 mx-auto">
            <h2 className="text-2xl font-bold">Odkazy</h2>
            <Link to={"/"} className="hover_underline">
              <p id="hover">Hlavní stránka</p>
            </Link>
            <Link to={"/hry"} className="hover_underline">
              <p id="hover">Hry</p>
            </Link>
            <Link to={"/kosik"} className="hover_underline">
              <p id="hover">Nákupní košík</p>
            </Link>
            <Link to={"/#characters"} className="hover_underline">
              <p id="hover">Postavy</p>
            </Link>
          </div>

          <div className="flex flex-col gap-y-3 lg:text-justify text-center lg:mx-0 mx-auto lg:my-0 my-5">
            <h2 className="text-2xl font-bold">Kontakt</h2>
            <p className="flex items-center gap-2">
              <Phone /> +420 123 456 789
            </p>
            <p className="flex items-center gap-2">
              <Mail />
              <a
                href="mailto:nightgrid@company.com"
                id="hover"
                className="mx-2 hover_underline"
              >
                nightgrid@company.com
              </a>
            </p>
          </div>

          <div className="flex flex-col lg:mx-0 mx-auto lg:pr-10 pr-0 gap-y-3 lg:text-justify text-center">
            <h2 className="text-2xl font-bold">Sociální sítě</h2>
            <div className="flex gap-4 lg:justify-normal justify-around">
              <Link to={"https://www.instagram.com/"}>
                <Instagram size={32} id="hover" />
              </Link>
              <Link to={"https://www.youtube.com/"}>
                <Youtube size={32} id="hover" />
              </Link>
              <Link to={"https://x.com/"}>
                <FaXTwitter size={32} id="hover" />
              </Link>
            </div>
            <div className="flex gap-4 lg:justify-normal justify-around">
              <Link to={"https://www.facebook.com/?locale=cs_CZ"}>
                <Facebook size={32} id="hover" />
              </Link>
              <Link to={"https://discord.com/"}>
                <FaDiscord size={32} id="hover" />
              </Link>
              <Link to={"https://www.reddit.com/"}>
                <FaRedditAlien size={32} id="hover" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <div>
            <p className="flex flex-col items-center">
              © 2025 - {year} NIGHTGRID
              <div className="flex gap-2">
                <Link
                  to={"https://github.com/ondrejfilip1"}
                  id="hover"
                  className="hover_underline"
                >
                  Ondřej Filip
                </Link>
                <Link
                  to={"https://github.com/DoubleBlackFox"}
                  id="hover"
                  className="hover_underline"
                >
                  Jan Rylich
                </Link>
                <Link
                  to={"https://github.com/Hurmex"}
                  id="hover"
                  className="hover_underline"
                >
                  Tomáš Tran
                </Link>
                <Link
                  to={"https://github.com/FiLlInnnn"}
                  id="hover"
                  className="hover_underline"
                >
                  Filip Voříšek
                </Link>
              </div>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
