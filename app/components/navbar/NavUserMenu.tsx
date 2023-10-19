"use client";
import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx"; // I used RiHamburgerMenuLine for the hamburger menu icon

const NavUserMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="relative p-2 gap-5 cursor-pointer flex items-center rounded-md">
      <BsPerson size={25} className="text-neutral-400" />
      <RxHamburgerMenu
        size={25}
        onClick={() => setOpenMenu((prevState) => !prevState)}
      />

      {openMenu && (
        <div
          className={`absolute bg-slate-800/80 left-0 rounded-md top-12 flex flex-col gap-4 w-24 p-2 text-neutral-300 transform transition-transform duration-300 ease-in-out 
        }`}
        >
          <div className="hover:text-white transition">Login</div>
          <div className="hover:text-white transition">SignUp</div>
        </div>
      )}
    </div>
  );
};

export default NavUserMenu;
