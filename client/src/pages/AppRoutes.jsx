import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Home";
import ProductCreateForm from "./Admin/GameCreate";
import UserList from "./Admin/UserList";
import GameView from "./Admin/GameView";
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
import GameList from "./Admin/GameList";
import UserSettings from "./UserSettings";

import Cursor from "@/components/Cursor";
import GameUpdate from "./Admin/GameUpdate";
import Payments from "./Payments";
import AdminRoute from "./Admin/AdminRoute";
import AboutUs from "./AboutUs";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Cursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hry" element={<Games />} />

          {/* user veci */}
          <Route path="/kosik" element={<Cart />} />
          <Route path="/completion" element={<Completion />} />
          <Route path="/platba" element={<Checkout />} />
          <Route path="/pribeh" element={<Chat />} />
          <Route path="/pribehy" element={<Menu />} />
          <Route path="/nastaveni" element={<UserSettings />} />
          <Route path="/platby" element={<Payments />} />
          <Route path="/o-nas" element={<AboutUs />} />

          {/* autentizace */}
          <Route path="/prihlaseni" element={<Login />} />
          <Route path="/registrace" element={<Register />} />

          {/* specialni */}
          <Route path="/*" element={<NotFound />} />

          {/* admin */}
          <Route path="/admin" element={<AdminRoute route={<Admin />} />} />
          <Route
            path="/admin/game-create"
            element={<AdminRoute route={<ProductCreateForm />} />}
          />
          <Route
            path="/admin/game-list"
            element={<AdminRoute route={<GameList />} />}
          />
          <Route
            path="/admin/user-list"
            element={<AdminRoute route={<UserList />} />}
          />
          <Route
            path="/admin/game/:id"
            element={<AdminRoute route={<GameView />} />}
          />
          <Route
            path="/admin/game-update/:id"
            element={<AdminRoute route={<GameUpdate />} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
