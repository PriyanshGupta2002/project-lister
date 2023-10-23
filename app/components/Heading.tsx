import React from "react";

interface headingProps {
  heading: string;
  subHeading: string;
  center?: boolean;
}
const Heading: React.FC<headingProps> = ({ heading, subHeading, center }) => {
  return (
    <div
      className={`flex flex-col gap-2 my-4 ${
        center ? "items-center" : "items-start"
      }`}
    >
      <div className="text-2xl text-gray-200 font-bold">{heading}</div>
      <div className="text-sm text-[#ffd5d5] font-medium">{subHeading}</div>
    </div>
  );
};

export default Heading;
