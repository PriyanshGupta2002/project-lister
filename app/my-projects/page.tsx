import React from "react";
import { getUserProjects } from "../actions/getUserProjects";
import { getCurrentUser } from "../actions/getCurrentUser";
import { SafeProject, SafeUser } from "../types";
import Heading from "../components/Heading";
import ProjectCard from "../components/projects/ProjectCard";
import { IParmas } from "../page";

const page = async ({ searchParams }: { searchParams: IParmas }) => {
  const { search } = searchParams;
  const currentUser = (await getCurrentUser()) as SafeUser;
  const projects = (await getUserProjects({
    userId: currentUser?.id,
    searchText: search,
  })) as (SafeProject & {
    user: SafeUser;
  })[];
  if (!currentUser) {
    return (
      <div className="min-h-screen">
        <Heading
          heading="Unauthorized"
          subHeading="Login to see your projects"
          center
        />
      </div>
    );
  }
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
  if (projects?.length === 0) {
    return (
      <div className="min-h-screen">
        <Heading
          heading="404 ):  No Projects Found"
          subHeading="Looks like you haven't created any project yet!"
          center
        />
      </div>
    );
  }
  return (
    <div>
      <div className="max-w-7xl min-h-screen m-auto mt-6 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-col-6 gap-9">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            currentUser={currentUser}
            deleteActionLabel="Delete"
          />
        ))}
      </div>
    </div>
  );
};

export default page;
