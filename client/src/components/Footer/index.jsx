import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { FaDiscord, FaRedditAlien } from "react-icons/fa";
import Logo from "@/assets/logo.png";

import Divider from "../Divider";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <Divider />
      <div className="mx-[22px] mb-[22px]">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-[180px]" />
          <div className="flex gap-4">
            <Link to={"https://www.instagram.com/"}>
              <Instagram size={32} id="hover"/>
            </Link>
            <Link to={"https://www.youtube.com/"}>
              <Youtube size={32} id="hover"/>
            </Link>
            <Link to={"https://x.com/"}>
              <Twitter size={32} id="hover"/>
            </Link>
            <Link to={"https://www.facebook.com/?locale=cs_CZ"}>
              <Facebook size={32} id="hover"/>
            </Link>
            <Link to={"https://discord.com/"}>
              <FaDiscord size={32} id="hover"/>
            </Link>
            <Link to={"https://www.reddit.com/"}>
              <FaRedditAlien size={32} id="hover"/>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
