"use client";
import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import { useRegister } from "@/app/hooks/useRegister";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useLogin } from "@/app/hooks/useLogin";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const loginModal = useLogin();
  const { isOpen, onClose, onOpen } = useRegister();

  const toggleToLoginModal = () => {
    onClose();
    loginModal.onOpen();
  };

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/register", {
        ...formValues,
      });
      toast.success(data.message);
      loginModal.onOpen();
      onClose();
    } catch (error: any) {
      toast.error(error.response.data.message || "Some error occured");
    } finally {
      setIsLoading(false);
    }
  });
  const body = (
    <div className="p-2 my-3 flex flex-col gap-3">
      <Input
        label="Name"
        placeholder="name"
        type="text"
        errors={errors}
        required
        id="name"
        register={register}
      />
      <Input
        label="Email"
        placeholder="Email"
        type="email"
        errors={errors}
        required
        id="email"
        register={register}
      />
      <Input
        label="Password"
        placeholder="password"
        type="password"
        errors={errors}
        required
        id="password"
        register={register}
      />
    </div>
  );
  const footer = (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-center items-center gap-3 p-4 flex-wrap">
        <button
          className="text-neutral-700  gap-4 bg-gray-300  p-4 transition rounded-md opacity-75 hover:opacity-100  flex items-center"
          onClick={() => {
            signIn("google");
            onClose();
          }}
        >
          Signin with Google <FcGoogle size={24} />
        </button>
        <button
          className="flex items-center p-4 gap-4  text-neutral-400 bg-black  hover:text-white transition rounded-md"
          onClick={() => {
            signIn("github");
            onClose();
          }}
        >
          Signin with Github
          <BsGithub size={24} />
        </button>
      </div>

      <small className="text-neutral-400 p-3">
        Already have an account?{" "}
        <span
          className="text-white text-base cursor-pointer hover:text-rose-500 transition"
          onClick={toggleToLoginModal}
        >
          Login Now
        </span>
      </small>
    </div>
  );
  return (
    <Modal
      body={body}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      title="Register"
      primaryActionLabel="Continue"
      onSubmit={onSubmit}
      footer={footer}
      disabled={isLoading}
    />
  );
};

export default RegisterModal;
