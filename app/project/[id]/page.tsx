import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getProjectById } from "@/app/actions/getProjectById";
import { getUserProjects } from "@/app/actions/getUserProjects";
import Heading from "@/app/components/Heading";
import { SimpleSlider } from "@/app/components/Carousel";
import ProjectBody from "@/app/components/projects/ProjectBody";
import ProjectHeader from "@/app/components/projects/ProjectHeader";
import { SafeComment, SafeProject, SafeUser } from "@/app/types";
import React from "react";
import ProjectCommentSection from "@/app/components/projects/ProjectCommentSection";
import { getCommentsByProjectId } from "@/app/actions/getCommentsByProjectId";
interface IParams {
  id: string;
}
interface SearchParams {
  filter: "asc" | "desc";
}
const page = async ({
  params,
  searchParams,
}: {
  params: IParams;
  searchParams: SearchParams;
}) => {
  const { id } = params;
  const { filter } = searchParams;
  const projectDetail = await getProjectById({ id });
  const userId = projectDetail?.userId as string;
  const userProjects = (await getUserProjects({ userId })) as (SafeProject & {
    user: SafeUser;
  })[];

  const currentUser = (await getCurrentUser()) as SafeUser;
  const comments = (await getCommentsByProjectId({
    id,
    filter,
  })) as (SafeComment & {
    User: SafeUser;
  })[];
  return (
    <div className="max-w-7xl m-auto mt-4 p-3">
      <ProjectHeader
        image={projectDetail?.image as string}
        user={projectDetail?.user as SafeUser}
        publishedDate={projectDetail?.createdAt as string}
        sourceCodeLink={projectDetail?.projectLink as string}
        liveUrlLink={projectDetail?.liveProjectLink as string}
        currentUser={currentUser}
        projectId={id}
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

            <SimpleSlider
              currentUser={currentUser}
              userProjects={userProjects}
            />
          </div>
        )}
      <hr />
      <ProjectCommentSection
        comments={comments}
        currentUser={currentUser}
        projectId={id}
      />
    </div>
  );
};

export default page;
