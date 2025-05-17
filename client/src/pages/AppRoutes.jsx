import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Home";
import ProductCreateForm from "./Admin/ProductCreateForm";
import ProductList from "./Admin/ProductList";
import ProductView from "./ProductView";
import ProductUpdateForm from "./Admin/ProductUpdateForm";
import NotFound from "./NotFound";
import Cart from "./Cart";
import Chat from "./Pribeh";
import Menu from "./Pribeh/Menu";
import Games from "./Games";
import Checkout from "./Cart/Checkout";
import Completion from "./Completion";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Admin from "./Admin";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hry" element={<Games />} />

          {/* user veci */}
          <Route path="/kosik" element={<Cart />} />
          <Route path="/completion" element={<Completion />} />
          <Route path="/platba" element={<Checkout />} />
          <Route path="/pribeh" element={<Chat />} />
          <Route path="/pribehy" element={<Menu />} />

          {/* autentizace */}
          <Route path="/prihlaseni" element={<Login />} />
          <Route path="/registrace" element={<Register />} />

          {/* specialni */}
          <Route path="/*" element={<NotFound />} />

          {/* admin */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-product" element={<ProductCreateForm />} />
          <Route path="/view-products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/update-product/:id" element={<ProductUpdateForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
