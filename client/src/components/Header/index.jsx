import { Link } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { useState } from "react";
import {
  Gamepad,
  ShoppingCart,
  Menu,
  Clapperboard,
  Users,
  History,
  Settings,
  LogIn,
  UserPlus,
  User,
  Shield,
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
  const [message, setMessage] = useState(
    localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "Nejsi přihlášen(a)"
  );

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
            id="hover"
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
              <p className="md:block hidden" id="hover">
                Nákupní košík
              </p>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                className="text-2xl button_hover button_cyberpunk !py-5"
                variant="ghost"
                id="hover"
              >
                <Menu className="w-32" />
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
    </>
  );
}
