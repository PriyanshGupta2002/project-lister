"use client";
import { useLogin } from "@/app/hooks/useLogin";
import { useRegister } from "@/app/hooks/useRegister";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx"; // I used RiHamburgerMenuLine for the hamburger menu icon

interface CurrentUserProps {
  currentUser?: SafeUser | null;
}
const NavUserMenu: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { onOpen } = useRegister();
  const loginModal = useLogin();
  return (
    <div className="relative p-2 gap-5 border-2 border-neutral-400 cursor-pointer flex items-center rounded-full">
      {currentUser?.image ? (
        <Image
          src={currentUser.image}
          alt={currentUser.name || "image"}
          width={30}
          height={30}
          className="rounded-full object-cover"
        />
      ) : (
        <BsPerson size={25} className="text-neutral-400" />
      )}
      <RxHamburgerMenu
        size={25}
        onClick={() => setOpenMenu((prevState) => !prevState)}
      />

      <div
        className={`absolute bg-white shadow-md border-2 transition-opacity duration-150 ease-linear ${
          openMenu ? "opacity-100" : "opacity-0"
        } border-neutral-300  text-neutral-700 left-14 rounded-md top-[120%]  -translate-x-[80%] flex flex-col gap-4 w-[200px] p-2  transform transition-transform duration-300 ease-in-out 
        }`}
      >
        {currentUser ? (
          <>
            <div className="hover:text-black  transition">
              Favorite Projects
            </div>
            <div className="hover:text-black transition">My Projects</div>
            <div
              className="hover:text-black transition"
              onClick={() => signOut()}
            >
              Logout
            </div>
          </>
        ) : (
          <>
            {" "}
            <div
              className="hover:text-black transition"
              onClick={() => {
                loginModal.onOpen();
              }}
            >
              Login
            </div>
            <div
              className="hover:text-black transition"
              onClick={() => onOpen()}
            >
              SignUp
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavUserMenu;
