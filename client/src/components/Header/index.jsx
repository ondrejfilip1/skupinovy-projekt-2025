import { Link } from "react-router-dom";
import Logo from "@/assets/logo.png";
import {
  Gamepad,
  ShoppingCart,
  Menu,
  Clapperboard,
  Users,
  History,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <>
      <div className="flex justify-between items-center sticky top-0 left-0 w-full px-12 pt-10 pb-12 text-2xl backdrop-blur-lg z-20 header_mask">
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
        <Link to="/">
          <img
            src={Logo}
            alt="NIGHTGRID"
            className="h-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-1 cursor-pointer"
            draggable={false}
          />
        </Link>
        <div className="flex gap-4">
          <Link to="/kosik">
            <Button
              className="text-2xl button_hover button_cyberpunk !py-5"
              variant="ghost"
              id="hover"
            >
              <ShoppingCart />
              <p className="md:block hidden">Nákupní košík</p>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                className="text-2xl button_hover button_cyberpunk !py-5"
                variant="ghost"
                id="hover"
              >
                <Menu />
                <p className="md:block hidden">Účet</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="button_cyberpunk background_text border-none text-black">
              <DropdownMenuLabel className="text-xl">
                Váš účet
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-black mx-2" />
              <DropdownMenuItem className="text-xl">
                <Clapperboard className="text-black" />
                Příběhy
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xl">
                <Users className="text-black" />
                Postavy
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xl">
                <History className="text-black" />
                Historie plateb
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xl">
                <Settings className="text-black" />
                Nastavení
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
