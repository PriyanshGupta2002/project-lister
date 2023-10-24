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
  footer?: React.ReactElement;
  disabled?: boolean;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
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
  secondaryAction,
  secondaryActionLabel,
}) => {
  return (
    <div
      className={`fixed bg-slate-900/40 duration-200 backdrop-blur-sm overflow-y-auto  z-20 ease-linear w-full h-full transition-all flex items-center justify-center ${
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }
     `}
    >
      <div
        className={`w-full overflow-y-auto bg-black/50 backdrop-blur-sm rounded-t-xl md:w-2/4 lg:w-1/2 xl:w-2/5
         h-full md:h-auto transition-opacity`}
      >
        <div className="flex items-center p-3">
          <IoMdClose
            color="white"
            size={23}
            className="cursor-pointer"
            onClick={onClose}
          />
          {title && (
            <div className="text-white mx-auto text-xl font-bold">{title}</div>
          )}
        </div>
        <hr className="border-[1.5px] border-neutral-200" />
        {body}
        {(primaryActionLabel || secondaryActionLabel) && (
          <div className="w-full p-3 flex items-center gap-3 ">
            {secondaryActionLabel && (
              <button
                onClick={secondaryAction}
                className={`bg-gray-400/50 text-white p-3 px-5 w-full  rounded-md disabled:cursor-not-allowed disabled:bg-rose-400`}
              >
                {secondaryActionLabel}
              </button>
            )}
            <button
              onClick={onSubmit}
              disabled={disabled}
              className={`bg-rose-600 text-white p-3 px-5 rounded-md w-full disabled:cursor-not-allowed disabled:bg-rose-400 ${
                !secondaryActionLabel && "w-full"
              }`}
            >
              {primaryActionLabel}
            </button>
          </div>
        )}
        {footer && <hr className="border-[1.5px] border-neutral-200 my-4" />}
        {footer}
      </div>
    </div>
  );
};

export default Modal;
