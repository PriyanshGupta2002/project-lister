"use client";
import React, { useCallback, useState } from "react";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import { SafeComment, SafeUser } from "@/app/types";
import { useLogin } from "@/app/hooks/useLogin";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CommentCard from "./CommentCard";

interface ProjectCommentSectionProps {
  currentUser?: SafeUser;
  projectId: string;
  comments: (SafeComment & {
    User: SafeUser;
  })[];
}
const ProjectCommentSection: React.FC<ProjectCommentSectionProps> = ({
  currentUser,
  projectId,
  comments,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
    },
  });
  const loginModal = useLogin();
  const router = useRouter();
  const onSubmit = handleSubmit(
    useCallback(
      async (values: any) => {
        if (!currentUser) {
          return loginModal.onOpen();
        }
        try {
          setIsLoading(true);
          const { data } = await axios.post("/api/comment", {
            projectId,
            message: values.comment,
          });
          router.refresh();
          toast.success(data.message);
          reset();
        } catch (error) {
          toast.error("Some error occured");
        } finally {
          setIsLoading(false);
        }
      },
      [currentUser, loginModal, projectId, reset, router]
    )
  );
  return (
    <div className="my-4">
      <Heading heading="Comments" subHeading="Engage and Share 😊" />
      <div className="flex flex-col space-y-4">
        <div className="flex md:items-center p-2 w-full gap-4 md:flex-row flex-col items-start">
          <Input
            errors={errors}
            id="comment"
            label="Comment Here"
            register={register}
            placeholder="comment"
            required
            type="text"
          />
          <button
            type="submit"
            title="comment"
            disabled={isLoading}
            className="ring-2 ring-slate-200 px-6 py-3 rounded-md group hover:ring-rose-600 hover:bg-rose-600 transition cursor-pointer disabled:cursor-not-allowed disabled:bg-rose-400"
          >
            <AiOutlineSend
              size={30}
              className="group-hover:rotate-90 transition"
              onClick={onSubmit}
            />
          </button>
        </div>
        <div className="my-5 p-3 flex flex-col space-y-8">
          {comments.map((comment) => (
            <CommentCard
              comment={comment}
              key={comment.id}
              currentUserId={currentUser?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCommentSection;
