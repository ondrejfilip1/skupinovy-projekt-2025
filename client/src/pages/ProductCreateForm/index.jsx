import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createGame } from "../../models/Game";

import React from "react";

export default function ProductCreateForm() {
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

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
      <h1>Create product</h1>
      <form>
        <input
          type="text"
          name="name"
          required
          placeholder="Enter name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          required
          placeholder="Enter category"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          required
          placeholder="Enter description"
          onChange={handleChange}
        />
        <input
          type="text"
          name="imagePath"
          required
          placeholder="Enter imagePath"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          required
          placeholder="Enter price"
          onChange={handleChange}
        />
        <button onClick={handlePost}>Add Product</button>
      </form>
      <p>{info}</p>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
