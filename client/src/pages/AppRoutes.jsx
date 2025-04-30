import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Home";
import ProductCreateForm from "./ProductCreateForm";
import ProductList from "./ProductList";
import ProductView from "./ProductView";
import ProductUpdateForm from "./ProductUpdateForm";
import NotFound from "./NotFound";
import Cart from "./Cart";
import Chat from "./Pribeh";
import Menu from "./Pribeh/Menu";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/add-product" element={<ProductCreateForm />} />
          <Route path="/view-products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/update-product/:id" element={<ProductUpdateForm />} />
          <Route path="/kosik" element={<Cart />} />
          <Route path="/pribeh" element={<Chat />} />
          <Route path="/pribehy" element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
