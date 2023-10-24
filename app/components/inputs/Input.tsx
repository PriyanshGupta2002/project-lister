"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  placeholder?: string;
  label: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  id: string;
  required?: boolean;
}
const Input: React.FC<InputProps> = ({
  placeholder,
  label,
  type,
  errors,
  register,
  required,
  id,
}) => {
  return (
    <div className="flex flex-col relative w-full ">
      <input
        {...register(id, { required })}
        type={type || "text"}
        className={`h-16 border-2 p-3  text-black peer outline-none rounded-md placeholder-transparent placeholder:text-base   ${
          errors[id] ? "border-rose-500" : "border-neutral-300"
        }
        ${errors[id] ? "focus:border-rose-500" : "focus:border-blue-600"}`}
        placeholder={placeholder || ""}
      />
      <label
        htmlFor=""
        className={`transition-all  absolute z-10  top-1 left-2 text-blue-600 text-xs peer-placeholder-shown:text-base  peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-5 peer-placeholder-shown:left-3 peer-focus:top-1 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-600 ${
          !!errors[id] ? "text-rose-500" : "text-neutral-600"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
