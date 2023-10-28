"use client";
import React, { useEffect } from "react";
import Heading from "./components/Heading";

interface ErrorStateProps {
  error: Error;
}
const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <>
      <div className="min-h-screen">
        <Heading heading="Uh Oh" subHeading="Something went wrong" center />
      </div>
    </>
  );
};

export default ErrorState;
