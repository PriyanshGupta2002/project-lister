"use client";
import React from "react";
import Modal from "./Modal";
import { useRegister } from "@/app/hooks/useRegister";

const RegisterModal = () => {
  const body = <input type="text" className="bg-slate-600" />;
  const { isOpen, onClose, onOpen } = useRegister();
  return (
    <Modal
      body={body}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      title="Login"
    />
  );
};

export default RegisterModal;
