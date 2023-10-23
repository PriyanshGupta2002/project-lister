import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getProjectById } from "@/app/actions/getProjectById";
import { getUserProjects } from "@/app/actions/getUserProjects";
import Heading from "@/app/components/Heading";
import { SimpleSlider } from "@/app/components/Carousel";
import ProjectBody from "@/app/components/projects/ProjectBody";
import ProjectHeader from "@/app/components/projects/ProjectHeader";
import { SafeProject, SafeUser } from "@/app/types";
import React from "react";
interface IParams {
  id: string;
}
const page = async ({ params }: { params: IParams }) => {
  const { id } = params;
  const projectDetail = await getProjectById({ id });
  const userId = projectDetail?.userId as string;
  const userProjects = (await getUserProjects({ userId })) as (SafeProject & {
    user: SafeUser;
  })[];
  const currentUser = (await getCurrentUser()) as SafeUser;
  return (
    <div className="max-w-7xl m-auto mt-4 p-3">
      <ProjectHeader
        image={projectDetail?.image as string}
        user={projectDetail?.user as SafeUser}
        publishedDate={projectDetail?.createdAt as string}
        sourceCodeLink={projectDetail?.projectLink as string}
        liveUrlLink={projectDetail?.liveProjectLink as string}
      />

      <ProjectBody
        title={projectDetail?.projectTitle as string}
        description={projectDetail?.projectDescription as string}
      />
      <hr />
      {projectDetail?.user?.Projects?.length &&
        projectDetail?.user?.Projects?.length > 0 && (
          <div className="flex flex-col  gap-4">
            <Heading
              heading={`More From  ${projectDetail.user.name}`}
              subHeading={`See More Projects made by ${projectDetail.user.name}`}
            />
            {/* <div className="grid grid-cols-4 gap-5 overflow-auto max-w-5xl m-auto">
              {userProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  currentUser={currentUser}
                />
              ))}
            </div> */}
            {/* <SliderCards
              currentUser={currentUser}
              userProjects={userProjects}
            /> */}
            <SimpleSlider
              currentUser={currentUser}
              userProjects={userProjects}
            />
          </div>
        )}
    </div>
  );
};

export default page;
