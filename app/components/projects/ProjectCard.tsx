"use client";

import { useLogin } from "@/app/hooks/useLogin";
import { SafeProject, SafeUser } from "@/app/types";
import { giveDate } from "@/app/utils/giveDate";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { PiUserSquareThin } from "react-icons/pi";
interface ProjectCardProps {
  project: SafeProject & {
    user: SafeUser;
  };
  currentUser?: SafeUser;
  deleteActionLabel?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  currentUser,
  deleteActionLabel,
}) => {
  const date = useMemo(() => {
    return giveDate(project.createdAt);
  }, [project.createdAt]);
  const isFavorite = useMemo(() => {
    return currentUser?.favoriteProjects.includes(project.id);
  }, [currentUser?.favoriteProjects, project.id]);
  const router = useRouter();

  const handleProjectDetail = useCallback(
    (id: string) => {
      router.push(`/project/${id}`);
    },
    [router]
  );
  const [deletingId, setDeletingId] = useState("");
  const loginModal = useLogin();

  const handleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      try {
        const { data } = await axios.get(`/api/favorite/${project.id}`);
        router.refresh();
        toast.success(data.message);
      } catch (error) {
        toast.error("Some error occured");
      }
    },
    [currentUser, loginModal, project.id, router]
  );
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setDeletingId(project.id);
    try {
      const { data } = await axios.delete(`/api/project/${project.id}`);
      router.refresh();
      toast.success(data.message);
    } catch (error) {
      toast.error("Some error occured! Please try again");
    } finally {
      setDeletingId("");
    }
  };
  return (
    <div
      className="flex flex-col gap-2 flex-1 col-span-1 cursor-pointer"
      onClick={() => handleProjectDetail(project.id)}
    >
      <div className="aspect-square w-full  overflow-hidden rounded-xl relative cursor-pointer ">
        <Image
          alt="image"
          src={project.image}
          fill
          className="object-cover h-full w-full hover:scale-110 transition ease-linear duration-150 opacity-60 hover:opacity-100"
        />

        {isFavorite ? (
          <AiFillHeart
            size={25}
            className="absolute right-3 z-1 top-3 text-rose-500"
            onClick={handleFavorite}
          />
        ) : (
          <AiOutlineHeart
            size={25}
            className="absolute right-3 z-1 top-3"
            onClick={handleFavorite}
          />
        )}
      </div>
      <div className="flex flex-col gap-4 p-3">
        <div className="flex flex-row justify-between flex-wrap gap-4 ">
          <span className="text-base   lg:text-base textCol font-bold">
            {project.projectTitle}
          </span>
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm text-neutral-400">
              {project.user.name}
            </span>
            <div className="flex items-center">
              {project.user.image ? (
                <Image
                  src={project.user.image}
                  alt="user"
                  className="w-5 h-5 rounded-full object-cover"
                  width={5}
                  height={5}
                />
              ) : (
                <PiUserSquareThin size={20} />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-4 justify-between">
          <span className=" text-xs  text-neutral-300">{date}</span>
        </div>
      </div>
      {deleteActionLabel && (
        <button
          disabled={deletingId === project.id}
          className="text-white disabled:bg-rose-400 disabled:cursor-not-allowed font-medium bg-rose-500 px-3 py-2 hover:bg-rose-700 transition rounded-lg outline-none"
          onClick={handleDelete}
        >
          {deleteActionLabel}
        </button>
      )}
    </div>
  );
};

export default ProjectCard;
