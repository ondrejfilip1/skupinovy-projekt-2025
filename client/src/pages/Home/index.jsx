import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import React from "react";

export default function Home() {
  return (
    <>
      <Header />
      <Link to={"/add-car"}>
        <p>Add car</p>
      </Link>

      <Link to={"/view-cars"}>
        <p>View car</p>
      </Link>
      <Footer />
    </>
  );
}
