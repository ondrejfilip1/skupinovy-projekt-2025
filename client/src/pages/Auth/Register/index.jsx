import Header from "@/components/Header";
import Footer from "@/components/Footer";
import croppedQr from "@/assets/qr1.svg";
import { Button } from "@/components/ui/button";
import qr2 from "@/assets/qr2.svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { register } from "@/models/User";
import { toast } from "sonner";

export default function Register() {
  const [formData, setFormData] = useState();
  const [message, setMessage] = useState("");
  const [passCorrect, setPassCorrect] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordCheck = (e) => {
    if (formData && formData.password) {
      if (formData.password !== e.target.value) {
        setMessage("Hesla se neshodují");
      } else {
        setMessage("");
        setPassCorrect(true);
      }
    }
  };

  const postForm = async (e) => {
    e.preventDefault();
    if (!passCorrect) return setMessage("Hesla se neshodují")
    const data = await register(formData);
    if (data.status === 200) {
      toast("Byli jste úspěšně zaregistrováni", {
        cancel: {
          label: <X className="text_text" />,
        },
      });
      navigate("/hry");
    }

    if (data.message === "User already exists")
      setMessage("Tento uživatel již existuje");
    else setMessage(data.message);

    console.log(data);
  };

  return (
    <>
      <Header />
      <div className="h_screen_fix border_main">
        <div className="h_screen_fix max-h-full border_main_child relative">
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
          <div className="text-center flex flex-col items-center justify-center m-10">
            <h1 className="text-center text-4xl mb-6">Registrace</h1>
            <form
              className="flex flex-col gap-2 max-w-72 w-full"
              onSubmit={postForm}
            >
              <Label>Uživatelské jméno</Label>
              <Input
                id="text"
                name="username"
                className="rounded-none border_color !text-xl !py-6 placeholder_color"
                type="text"
                minLength={3}
                maxLength={20}
                placeholder="Zadejte uživatelské jméno"
                onChange={handleChange}
                required
              />
              <Label>Heslo</Label>
              <Input
                id="text"
                name="password"
                className="rounded-none border_color !text-xl !py-6 placeholder_color"
                type="password"
                minLength={8}
                maxLength={64}
                placeholder="Zadejte heslo"
                onChange={(e) => {
                  handleChange(e);
                  handlePasswordCheck(e);
                }}
                required
              />
              <Label>Zopakujte heslo</Label>
              <Input
                id="text"
                name="password2"
                className="rounded-none border_color !text-xl !py-6 placeholder_color"
                type="password"
                minLength={8}
                maxLength={64}
                placeholder="Zopakujte heslo"
                onChange={handlePasswordCheck}
                required
              />
              <div className="background_text p-[1px] button_cyberpunk w-full my-2">
                <Button
                  id="hover"
                  className="w-full button_cyberpunk background_bg relative text_text !text-xl py-6 px-4 focus:outline-none border-none focus-visible:border-ring focus-visible:ring-ring/0 focus-visible:ring-[0px]"
                >
                  Zaregistrovat se
                </Button>
              </div>
            </form>
            {message}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
