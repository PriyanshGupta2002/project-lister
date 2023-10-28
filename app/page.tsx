import React from "react";
import { getProjects } from "./actions/getProjects";
import { SafeProject, SafeUser } from "./types";
import ProjectCard from "./components/projects/ProjectCard";
import { getCurrentUser } from "./actions/getCurrentUser";
import Heading from "./components/Heading";

export interface IParmas {
  search?: string;
}
const page = async ({ searchParams }: { searchParams: IParmas }) => {
  const { search } = searchParams;
  const projects = (await getProjects({
    searchText: search,
  })) as (SafeProject & {
    user: SafeUser;
  })[];
  const currentUser = (await getCurrentUser()) as SafeUser;
  if (projects.length === 0 && search) {
    return (
      <div className="min-h-screen">
        <Heading
          heading="No Result"
          subHeading={`There were no matching projects with name ${search}`}
          center
          resetPath
        />
      </div>
    );
  }
  return (
    <>
      <hr />
      <div className="max-w-7xl min-h-screen m-auto mt-6 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-col-6 gap-9">
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
