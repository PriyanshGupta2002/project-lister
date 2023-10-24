"use client";

import { SafeUser } from "@/app/types";
import { giveDate } from "@/app/utils/giveDate";
import Image from "next/image";
import React, { useMemo } from "react";
import SideWidgetTray from "./ProjectSideWidgetTray";
interface ProjectHeaderProps {
  image: string;
  user: SafeUser;
  publishedDate: string;
  sourceCodeLink: string;
  liveUrlLink?: string;
  currentUser?: SafeUser;
  projectId: string;
}
const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  image,
  publishedDate,
  user,
  sourceCodeLink,
  liveUrlLink,
  currentUser,
  projectId,
}) => {
  const date = useMemo(() => {
    return giveDate(publishedDate);
  }, [publishedDate]);
  return (
    <div className="flex flex-col gap-6">
      <div
        className={`w-full overflow-hidden rounded-md opacity-60  relative aspect-video md:aspect-square`}
      >
        <Image
          src={image}
          alt="Image"
          fill
          className="object-cover w-full  shadow-lg h-full"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {user?.image && (
            <Image
              alt="name"
              src={user.image}
              width={30}
              height={30}
              className="object-contain rounded-full"
            />
          )}
          <span className="text-base text-neutral-400 font-medium">
            {user.name}
          </span>
        </div>
        <div className="text-neutral-300 ">{date}</div>
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between p-2 gap-4 flex-wrap">
        <div className="flex  items-center space-x-4">
          <a
            href={sourceCodeLink}
            target="__blank"
            className="bg-rose-500 hover:bg-rose-600 transition  p-3 rounded-md text-base font-bold"
          >
            Source Code
          </a>

          {liveUrlLink && (
            <a
              href={liveUrlLink}
              target="__blank"
              className="border-2 border-neutral-300 p-3 rounded-md text-base hover:bg font-bold hover:bg-[#664EAE] transition hover:border-transparent"
            >
              Live Site
            </a>
          )}
        </div>

        <SideWidgetTray currentUser={currentUser} projectId={projectId} />
      </div>
    </div>
  );
};

export default ProjectHeader;
