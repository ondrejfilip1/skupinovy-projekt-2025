import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createGame } from "../../../models/Game";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CornerUpLeft, X, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

import React from "react";

export default function GameCreate() {
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [isPathCorrect, setIsPathCorrect] = useState(false);
  const navigate = useNavigate();

  const postForm = async () => {
    const product = await createGame(formData);
    if (product.status === 201) {
      toast("Game has been successfully created", {
        unstyled: false,
        cancel: {
          label: <X className="text-black" />,
        },
        classNames: {
          toast:
            "no_style_component !rounded-xl !border-[#e5e5e5] !bg-white !toaster !text-sm",
          title: "!text-sm",
        },
      });
      return navigate();
    }
    setInfo(product.message);
  };

  const checkImagePath = async (e) => {
    let img = new Image();
    img.src = `${e.target.value}1.png`;
    img.onerror = () => setIsPathCorrect(false);
    img.onload = () => setIsPathCorrect(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl flex justify-between items-center">
          Create game
          <Link to={-1}>
            <Button>
              <CornerUpLeft />
              Go back
            </Button>
          </Link>
        </h1>
        <form className="grid gap-2 my-2" onSubmit={handlePost}>
          <Label>Enter name</Label>
          <Input
            type="text"
            name="name"
            required
            placeholder="Enter name"
            onChange={handleChange}
          />
          <Label>Enter category</Label>
          <Input
            type="text"
            name="category"
            required
            placeholder="Enter category"
            onChange={handleChange}
          />
          <Label>Enter description</Label>
          <Textarea
            type="text"
            name="description"
            required
            placeholder="Enter description"
            onChange={handleChange}
          />
          <Label className="relative">
            Enter imagePath
            {isPathCorrect ? (
              <Check className="text-green-600 absolute right-0" />
            ) : (
              <X className="text-red-600 absolute right-0" />
            )}
          </Label>
          <Input
            type="text"
            name="imagePath"
            required
            placeholder="Enter imagePath"
            onChange={(e) => {
              handleChange(e);
              checkImagePath(e);
            }}
          />
          <Label>Enter price</Label>
          <Input
            type="number"
            name="price"
            required
            placeholder="Enter price"
            onChange={handleChange}
          />
          <Button className="w-fit">Create Game</Button>
        </form>
        <p>{info}</p>
      </div>
    </>
  );
}
