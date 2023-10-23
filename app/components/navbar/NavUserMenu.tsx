"use client";
import { useLogin } from "@/app/hooks/useLogin";
import { useProject } from "@/app/hooks/useProject";
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
  const projectModal = useProject();
  return (
    <div className="relative  p-2 gap-5 border-2 border-neutral-400 cursor-pointer flex items-center rounded-full">
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

      {openMenu && (
        <div
          className={`absolute z-10 bg-black/60  backdrop-blur-sm shadow-md border-2   border-neutral-300 font-medium  text-[#efefef] left-14 rounded-md top-[120%]  -translate-x-[80%] flex flex-col gap-4 w-[200px] p-2  transform transition-transform duration-300 ease-in-out 
        }`}
        >
          {currentUser ? (
            <>
              <div
                className="hover:text-rose-400  transition under"
                onClick={projectModal.onOpen}
              >
                Add Your Project
              </div>
              <div className="hover:text-rose-400  transition under">
                Favorite Projects
              </div>
              <div className="hover:text-rose-400  transition under">
                My Projects
              </div>
              <div
                className="hover:text-rose-400  transition under"
                onClick={() => signOut()}
              >
                Logout
              </div>
            </>
          ) : (
            <>
              {" "}
              <div
                className="hover:text-rose-400  transition under"
                onClick={() => {
                  loginModal.onOpen();
                }}
              >
                Login
              </div>
              <div
                className="hover:text-rose-400 transition under"
                onClick={() => onOpen()}
              >
                SignUp
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NavUserMenu;
