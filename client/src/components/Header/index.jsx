import { Link } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { Gamepad, ShoppingCart, Menu } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <>
      <div className="flex justify-between items-center sticky w-full px-12 py-10 text-2xl relative backdrop-blur-lg">
        <img
          src={Logo}
          alt="logo"
          className="h-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          draggable={false}
        />
        <div className="flex gap-4">
          <Link to="/hry">
            <Button
              className="text-2xl button_hover button_cyberpunk !py-5"
              variant="ghost"
            >
              <Gamepad />
              Hry
            </Button>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link to="/kosik">
            <Button
              className="text-2xl button_hover button_cyberpunk !py-5"
              variant="ghost"
            >
              <ShoppingCart />
              Nákupní košík
            </Button>
          </Link>
          <Link to="/kosik">
            <Button
              className="text-2xl button_hover button_cyberpunk !py-5"
              variant="ghost"
            >
              <Menu />
              Účet
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
