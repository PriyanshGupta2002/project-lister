"use client";
import React, { useMemo } from "react";
import ProjectCard from "./projects/ProjectCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/parallax";
import "swiper/css/pagination";

import { FreeMode, Navigation } from "swiper/modules";
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
  const slidesPerView = useMemo(() => {
    return Math.min(3, userProjects.length);
  }, [userProjects.length]);
  return (
    <div className="flex items-center justify-center flex-col ">
      <Swiper
        loop={true}
        breakpoints={{
          340: {
            slidesPerView: useMemo(() => {
              return Math.min(1, userProjects.length);
            }, [userProjects.length]),
            spaceBetween: 15,
          },
          700: {
            slidesPerView: useMemo(() => {
              return Math.min(2, userProjects.length);
            }, [userProjects.length]),
            spaceBetween: 15,
          },
          1024: {
            slidesPerView, // Define the number of slides per view for larger screens
            spaceBetween: 30, // Adjust the space between slides for larger screens
          },
        }}
        navigation
        freeMode
        modules={[FreeMode, Navigation]}
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
