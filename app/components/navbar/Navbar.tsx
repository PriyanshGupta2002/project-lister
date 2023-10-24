import React from "react";
import NavUserMenu from "./NavUserMenu";
import { SafeUser } from "@/app/types";
import Search from "../inputs/Search";
import Link from "next/link";

interface NavbarProps {
  currentUser?: SafeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <header className="p-4">
      <nav className="flex items-center justify-between max-w-7xl m-auto flex-wrap">
        <Link
          href={"/"}
          className="text-3xl  cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-500 font-bold bg-clip-text text-transparent"
        >
          ProjectBazaar
        </Link>
        <NavUserMenu currentUser={currentUser} />
      </nav>
    </header>
  );
};

export default Navbar;
