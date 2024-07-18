import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <div className="max-w-[1400px] mx-auto">
        <Navbar />
        <div className="pb-[200px] md:pb-[344px] pt-[250px] md:pt-[135px]">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}
