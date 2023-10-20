"use client";
import React from "react";
import { IoMdClose } from "react-icons/io";
interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  body?: React.ReactElement;
  primaryActionLabel?: string;
  onSubmit?: () => void;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  body,
  onSubmit,
  primaryActionLabel,
  title,
}) => {
  return (
    <div
      className={`fixed bg-slate-900/40 w-full h-full transition-all z-10 flex items-center justify-center ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className={`w-full bg-white rounded-t-xl p-3 md:w-2/3 lg:w-1/2 h-full md:h-auto `}
      >
        <div className="flex items-center p-2" onClick={onClose}>
          <IoMdClose color="black" size={23} className="cursor-pointer" />
          {title && (
            <div className="text-neutral-700 mx-auto text-xl font-bold">
              {title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
