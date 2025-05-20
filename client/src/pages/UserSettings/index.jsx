import Header from "@/components/Header";
import croppedQr from "@/assets/qr1.svg";
import { Button } from "@/components/ui/button";
import qr2 from "@/assets/qr2.svg";
import { UserCog, User, UserPen, X } from "lucide-react";
import UserLock from "@/assets/icons/user-lock.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { changePassword, changeUsername } from "@/models/User";
import { toast } from "sonner";

export default function UserSettings() {
  const [displayedUsername, setDisplayedUsername] = useState(
    localStorage.getItem("username")
  );
  const [hasToken, setHasToken] = useState(localStorage.getItem("token"));
  const [usernameFormdata, setUsernameFormdata] = useState({
    username: localStorage.getItem("username"),
  });
  const [passwordFormdata, setPasswordFormdata] = useState({
    username: localStorage.getItem("username"),
  });

  const changePasswordFunc = async () => {
    const data = await changePassword(passwordFormdata);
    if (data.status === 200)
      toast("Vaše heslo bylo úspešně změněno", {
        cancel: {
          label: <X className="text_text" />,
        },
      });
    else {
      if (data.message === "Invalid credentials")
        toast("Nesprávné údaje", {
          cancel: {
            label: <X className="text_text" />,
          },
        });
      else
        toast("Nastala chyba při změně hesla", {
          cancel: {
            label: <X className="text_text" />,
          },
          description: data.message,
        });
    }
  };

  const changeUsernameFunc = async () => {
    const data = await changeUsername(usernameFormdata);
    if (data.status === 200) {
      toast("Vaše jméno bylo úspešně změněno", {
        cancel: {
          label: <X className="text_text" />,
        },
      });
      setDisplayedUsername(usernameFormdata["username_new"]);
      localStorage.setItem("username", usernameFormdata["username_new"]);
    } else {
      if (data.message === "Invalid credentials")
        toast("Nesprávné údaje", {
          cancel: {
            label: <X className="text_text" />,
          },
        });
      else
        toast("Nastala chyba při změně jména", {
          cancel: {
            label: <X className="text_text" />,
          },
          description: data.message,
        });
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordFormdata({
      ...passwordFormdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleUsernameChange = (e) => {
    setUsernameFormdata({
      ...usernameFormdata,
      [e.target.name]: e.target.value,
    });
  };

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

          {hasToken ? (
            <>
              <div className="m-10">
                <h1 className="text-center text-4xl mb-6">
                  Uživatelské nastavení
                </h1>

                <p className="text-xl my-4 flex items-center gap-2">
                  <User />
                  Uživatelské jméno: {localStorage.getItem("username")}
                </p>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="background_text p-[1px] button_cyberpunk w-fit">
                      <Button
                        id="hover"
                        className="button_cyberpunk background_bg relative text_text !text-xl py-6 px-4 focus:outline-none border-none focus-visible:border-ring focus-visible:ring-ring/0 focus-visible:ring-[0px]"
                      >
                        Změnit jméno uživatele
                        <UserPen className="!w-5 !h-5" />
                      </Button>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="border-none background_text p-[1px] button_cyberpunk">
                    <div className="button_cyberpunk background_bg relative text_text p-4">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Změna uživatelského jména
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text_text">
                          Zadejte své heslo a poté nové jméno
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <Input
                        id="text"
                        name="password"
                        className="rounded-none border_color !py-5 placeholder_color my-4"
                        type="password"
                        placeholder="Zadejte heslo"
                        onChange={handleUsernameChange}
                        required
                      />
                      <Input
                        id="text"
                        name="username_new"
                        className="rounded-none border_color !py-5 placeholder_color my-4"
                        type="text"
                        placeholder="Zadejte nové uživatelského jméno"
                        onChange={handleUsernameChange}
                        required
                      />
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
                          onClick={changeUsernameFunc}
                        >
                          Změnit jméno
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
                <div className="my-4" />
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="background_text p-[1px] button_cyberpunk w-fit">
                      <Button
                        id="hover"
                        className="button_cyberpunk background_bg relative text_text !text-xl py-6 px-4 focus:outline-none border-none focus-visible:border-ring focus-visible:ring-ring/0 focus-visible:ring-[0px]"
                      >
                        Změnit heslo
                        <img src={UserLock} />
                      </Button>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="border-none background_text p-[1px] button_cyberpunk">
                    <div className="button_cyberpunk background_bg relative text_text p-4">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Změna hesla</AlertDialogTitle>
                        <AlertDialogDescription className="text_text">
                          Zadejte své staré heslo a poté nové heslo
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <Input
                        id="text"
                        name="password_old"
                        className="rounded-none border_color !py-5 placeholder_color my-4"
                        type="text"
                        placeholder="Zadejte staré heslo"
                        onChange={handlePasswordChange}
                        required
                      />
                      <Input
                        id="text"
                        name="password"
                        className="rounded-none border_color !py-5 placeholder_color mb-4"
                        type="text"
                        placeholder="Zadejte nové heslo"
                        onChange={handlePasswordChange}
                        required
                      />
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
                          onClick={() => changePasswordFunc()}
                        >
                          Změnit heslo
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </>
          ) : (
            <>
              <div className="w-full flex flex-col justify-center items-center text-center h-full absolute left-1/2 transform -translate-x-1/2">
                <UserCog strokeWidth={1} className="w-20 h-20 mb-4" />
                <div className="text-2xl">
                  Pro zobrazení uživatelských nastavení potřebujete účet
                </div>
                <div className="mt-10">
                  Máte již účet?{" "}
                  <Link to="/prihlaseni" id="hover" className="underline">
                    Přihlaste se
                  </Link>
                </div>
                <div className="my-2">
                  Nemáte účet?{" "}
                  <Link to="/registrace" id="hover" className="underline">
                    Zaregistrujte se
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
