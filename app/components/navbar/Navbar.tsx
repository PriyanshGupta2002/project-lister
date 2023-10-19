import React from "react";
import NavUserMenu from "./NavUserMenu";

const Navbar = () => {
  return (
    <header className="p-4">
      <nav className="flex items-center justify-between max-w-7xl m-auto">
        <div className="text-2xl font-bold cursor-pointer">Project Lister</div>
        <NavUserMenu />
      </nav>
    </header>
  );
};

export default Navbar;
