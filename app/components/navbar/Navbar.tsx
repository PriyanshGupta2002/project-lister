import React from "react";
import NavUserMenu from "./NavUserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <header className="p-4">
      <nav className="flex items-center justify-between max-w-7xl m-auto">
        <div className="text-2xl font-bold cursor-pointer">Project Lister</div>
        <NavUserMenu currentUser={currentUser} />
      </nav>
    </header>
  );
};

export default Navbar;
