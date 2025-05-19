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

import Cursor from "@/components/Cursor";
import GameUpdate from "./Admin/GameUpdate";

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

          {/* autentizace */}
          <Route path="/prihlaseni" element={<Login />} />
          <Route path="/registrace" element={<Register />} />

          {/* specialni */}
          <Route path="/*" element={<NotFound />} />

          {/* admin */}
          <Route
            path="/admin"
            element={
              <div className="no_style">
                <Admin />
              </div>
            }
          />
          <Route
            path="/admin/game-create"
            element={
              <div className="no_style">
                <ProductCreateForm />
              </div>
            }
          />
          <Route
            path="/admin/game-list"
            element={
              <div className="no_style">
                <GameList />
              </div>
            }
          />
          <Route
            path="/admin/user-list"
            element={
              <div className="no_style">
                <UserList />
              </div>
            }
          />
          <Route
            path="/admin/game/:id"
            element={
              <div className="no_style">
                <GameView />
              </div>
            }
          />
          <Route
            path="/admin/game-update/:id"
            element={
              <div className="no_style">
                <GameUpdate />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
