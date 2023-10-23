import React from "react";
interface ProjectBodyProps {
  title: string;
  description: string;
}
const ProjectBody: React.FC<ProjectBodyProps> = ({ title, description }) => {
  return (
    <div className="my-3 p-4 space-y-4">
      <h3 className="text-2xl font-bold text-slate-300">{title}</h3>
      <p className="text-justify">{description}</p>
    </div>
  );
};

export default ProjectBody;
