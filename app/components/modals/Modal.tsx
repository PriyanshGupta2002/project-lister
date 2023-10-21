"use client";
import React from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  body?: React.ReactElement;
  primaryActionLabel?: string;
  onSubmit?: () => void;
  title?: string;
  footer?: React.ReactElement;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  body,
  onSubmit,
  primaryActionLabel,
  title,
  footer,
  disabled,
}) => {
  return (
    <div
      className={`fixed bg-slate-900/40 duration-200 backdrop-blur-sm ease-linear w-full h-full transition-all z-10 flex items-center justify-center ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }
     `}
    >
      <div
        className={`w-full bg-neutral-100 rounded-t-xl md:w-2/4 lg:w-1/2 xl:w-2/5 h-full md:h-auto transition-opacity`}
      >
        <div className="flex items-center p-3">
          <IoMdClose
            color="black"
            size={23}
            className="cursor-pointer"
            onClick={onClose}
          />
          {title && (
            <div className="text-neutral-700 mx-auto text-xl font-bold">
              {title}
            </div>
          )}
        </div>
        <hr className="border-[1.5px] border-neutral-200" />
        {body}
        <div className="w-full p-3 flex items-center">
          <button
            onClick={onSubmit}
            disabled={disabled}
            className={`bg-rose-600 text-white p-3 w-full rounded-md disabled:cursor-not-allowed disabled:bg-rose-400`}
          >
            {primaryActionLabel}
          </button>
        </div>
        <hr className="border-[1.5px] border-neutral-200 my-4" />
        {footer}
      </div>
    </div>
  );
};

export default Modal;
