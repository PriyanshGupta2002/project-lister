"use client";
import React, { useState } from "react";
import Modal from "./Modal";

import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useLogin } from "@/app/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useRegister } from "@/app/hooks/useRegister";

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginModal = useLogin();
  const router = useRouter();
  const registerModal = useRegister();
  const onSubmit = handleSubmit(async (formValues) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        ...formValues,
        redirect: false,
      });
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Logged In");
      loginModal.onClose();
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message || "Some error occured");
    } finally {
      setIsLoading(false);
    }
  });
  const toggleToRegisterModal = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };
  const body = (
    <div className="p-2 my-3 flex flex-col gap-3">
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
  const { isOpen, onClose, onOpen } = useLogin();
  const footer = (
    <div className="flex flex-col space-y-5">
      <div className="flex items-center gap-3 p-4 flex-wrap">
        <button
          className="flex-1 text-neutral-700  gap-4 bg-gray-300 py-3 transition rounded-md opacity-75 hover:opacity-100  flex items-center justify-center"
          onClick={() => {
            signIn("google");
          }}
        >
          Signin with Google <FcGoogle size={24} />
        </button>
        <button
          className="flex-1 flex items-center gap-4 justify-center text-neutral-400 bg-black py-3 hover:text-white transition rounded-md"
          onClick={() => {
            signIn("github");
          }}
        >
          Signin with Github
          <BsGithub size={24} />
        </button>
      </div>
      <small className="text-neutral-400 p-3">
        Don't have an account yet?{" "}
        <span
          className="text-neutral-600 text-base cursor-pointer hover:text-rose-500 transition"
          onClick={toggleToRegisterModal}
        >
          Register Now
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
      title="Login"
      primaryActionLabel="Continue"
      onSubmit={onSubmit}
      footer={footer}
      disabled={isLoading}
    />
  );
};

export default LoginModal;
