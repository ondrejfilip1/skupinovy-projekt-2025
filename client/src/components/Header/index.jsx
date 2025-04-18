import { Link } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { Gamepad, ShoppingCart, Menu } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <>
      <div className="flex justify-between items-center sticky top-0 left-0 w-full px-12 pt-10 pb-12 text-2xl backdrop-blur-lg z-20 header_mask">
        <img
          src={Logo}
          alt="NIGHTGRID"
          className="h-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-1"
          draggable={false}
        />
        <div className="flex gap-4">
          <Link to="/hry">
            <Button
              className="text-2xl button_hover button_cyberpunk !py-5"
              variant="ghost"
              id="hover"
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
              id="hover"
            >
              <ShoppingCart />
              Nákupní košík
            </Button>
          </Link>
          <Link to="/kosik">
            <Button
              className="text-2xl button_hover button_cyberpunk !py-5"
              variant="ghost"
              id="hover"
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
