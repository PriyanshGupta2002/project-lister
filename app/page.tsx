import React from "react";
import { getProjects } from "./actions/getProjects";
import { SafeProject, SafeUser } from "./types";
import ProjectCard from "./components/projects/ProjectCard";
import { getCurrentUser } from "./actions/getCurrentUser";
import Search from "./components/inputs/Search";

const page = async () => {
  const projects = (await getProjects()) as (SafeProject & {
    user: SafeUser;
  })[];
  const currentUser = (await getCurrentUser()) as SafeUser;
  return (
    <>
      <Search />
      <hr />
      <div className="max-w-7xl m-auto mt-6 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-col-6 gap-9">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            currentUser={currentUser}
          />
        ))}
      </div>
    </>
  );
};

export default page;
