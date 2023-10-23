"use client";

import { SafeUser } from "@/app/types";
import { giveDate } from "@/app/utils/giveDate";
import Image from "next/image";
import React from "react";
interface ProjectHeaderProps {
  image: string;
  user: SafeUser;
  publishedDate: string;
  sourceCodeLink: string;
  liveUrlLink?: string;
}
const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  image,
  publishedDate,
  user,
  sourceCodeLink,
  liveUrlLink,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full h-[500px] relative">
        <Image
          src={image}
          alt="Image"
          fill
          className="object-cover object-top w-full h-full"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {user.image && (
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
        <div className="text-neutral-300 ">{giveDate(publishedDate)}</div>
      </div>
      <hr className="my-2" />
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
    </div>
  );
};

export default ProjectHeader;
