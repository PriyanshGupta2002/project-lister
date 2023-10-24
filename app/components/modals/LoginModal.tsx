"use client";
import React, { useCallback, useState } from "react";
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
  const onSubmit = handleSubmit(
    useCallback(
      async (formValues) => {
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
      },
      [loginModal, router]
    )
  );
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
          className="flex items-center p-4 gap-4  text-neutral-400 border-2 border-neutral-300 bg-black  hover:text-white transition rounded-md"
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
        Don&apos;t have an account yet?{" "}
        <span
          className="text-white text-base cursor-pointer hover:text-rose-500 transition"
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
