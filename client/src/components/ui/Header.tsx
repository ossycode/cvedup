import React from "react";
import Logo from "./Logo";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className=" flex items-center gap-20 w-full bg-zinc-100 px-12 py-6 border-b border-gray-200 font-FannGrotesqueProBook ">
      <Logo />
      <NavBar />
    </header>
  );
};

export default Header;
