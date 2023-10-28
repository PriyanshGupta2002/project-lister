"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface headingProps {
  heading: string;
  subHeading: string;
  center?: boolean;
  resetPath?: boolean;
}
const Heading: React.FC<headingProps> = ({
  heading,
  subHeading,
  center,
  resetPath,
}) => {
  const pathName = usePathname();
  const router = useRouter();
  const handleReset = useCallback(() => {
    router.push(pathName);
  }, [router, pathName]);
  return (
    <div
      className={`flex flex-col gap-2 my-4 ${
        center ? "items-center" : "items-start"
      }`}
    >
      <div className="text-2xl text-gray-200 font-bold">{heading}</div>
      <div className="text-sm text-[#ffd5d5] font-medium">{subHeading}</div>
      {resetPath && (
        <button
          className="text-base px-7 py-2 border-2 border-white text-neutral-300  rounded-md mt-4 cursor-pointer font-medium outline-none"
          title="Reset"
          type="button"
          onClick={handleReset}
        >
          Reset Search
        </button>
      )}
    </div>
  );
};

export default Heading;
