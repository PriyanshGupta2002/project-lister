"use client";
import React from "react";
import ProjectCard from "./projects/ProjectCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";
import { SafeProject, SafeUser } from "../types";
interface SliderCardProps {
  currentUser?: SafeUser;
  userProjects: (SafeProject & {
    user: SafeUser;
  })[];
}
export const SimpleSlider: React.FC<SliderCardProps> = ({
  userProjects,
  currentUser,
}) => {
  return (
    <div className="flex items-center justify-center flex-col ">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {userProjects.map((project) => (
          <SwiperSlide key={project.id}>
            <ProjectCard project={project} currentUser={currentUser} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
