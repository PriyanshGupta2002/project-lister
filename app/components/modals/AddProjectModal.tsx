"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import { useProject } from "@/app/hooks/useProject";
import Heading from "../Heading";
import ImageUpload from "../inputs/ImageUpload";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../inputs/Input";

enum STEPS {
  IMAGE = 0,
  INFO = 1,
  LINKS = 2,
}
const AddProjectModal = () => {
  const { isOpen, onClose, onOpen } = useProject();
  const [step, setStep] = useState(STEPS.IMAGE);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  // const imageUrl =

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, [step]);

  const onPrev = useCallback(() => {
    if (step === STEPS.IMAGE) {
      return;
    }
    setStep((prevStep) => prevStep - 1);
  }, [step]);

  const primaryLabel = useMemo(() => {
    if (step === STEPS.LINKS) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.IMAGE) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let body = (
    <div className="flex flex-col gap-8 p-5">
      <Heading
        heading="Project Thumbnail"
        subHeading="Add a beautiful thumbnail to your project"
      />
      <ImageUpload />
    </div>
  );
  if (step === STEPS.INFO) {
    body = (
      <div className="flex flex-col p-3 mt-6 space-y-5">
        <Heading
          heading="About Project"
          subHeading="Fill in the project title and give description about the project"
        />
        <Input
          required
          label="Project Title"
          id="title"
          type="text"
          placeholder="Project Title"
          register={register}
          errors={errors}
        />
        <Input
          required
          label="Project Description"
          id="title"
          type="text"
          placeholder="Project Description"
          register={register}
          errors={errors}
        />
      </div>
    );
  }

  return (
    <Modal
      title="Add Project"
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      body={body}
      primaryActionLabel={primaryLabel}
      secondaryActionLabel={secondaryLabel}
      onSubmit={() => {
        setStep((prev) => prev + 1);
      }}
      secondaryAction={onPrev}
    />
  );
};

export default AddProjectModal;
