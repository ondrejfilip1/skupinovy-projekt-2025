import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createGame } from "../../../models/Game";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React from "react";

export default function GameCreate() {
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  if (localStorage.getItem("isAdmin") !== "true") return <NotFound />;

  const postForm = async () => {
    const product = await createGame(formData);
    if (product.status === 201) {
      return navigate();
    }
    setInfo(product.message);
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
        <h1 className="text-4xl">Create game</h1>
        <form className="grid gap-2">
          <Input
            type="text"
            name="name"
            required
            placeholder="Enter name"
            onChange={handleChange}
            className="rounded-none border_color placeholder_color"
          />
          <Input
            type="text"
            name="category"
            required
            placeholder="Enter category"
            onChange={handleChange}
            className="rounded-none border_color placeholder_color"
          />
          <Input
            type="text"
            name="description"
            required
            placeholder="Enter description"
            onChange={handleChange}
            className="rounded-none border_color placeholder_color"
          />
          <Input
            type="text"
            name="imagePath"
            required
            placeholder="Enter imagePath"
            onChange={handleChange}
            className="rounded-none border_color placeholder_color"
          />
          <Input
            type="number"
            name="price"
            required
            placeholder="Enter price"
            onChange={handleChange}
            className="rounded-none border_color placeholder_color"
          />
          <Button onClick={handlePost}>Create Game</Button>
        </form>
        <p>{info}</p>
        <Link to={-1}>
          <p>Go back</p>
        </Link>
      </div>
    </>
  );
}
