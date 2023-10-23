"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import { useProject } from "@/app/hooks/useProject";
import Heading from "../Heading";
import ImageUpload from "../inputs/ImageUpload";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  IMAGE = 0,
  INFO = 1,
  LINKS = 2,
}
const AddProjectModal = () => {
  const { isOpen, onClose, onOpen } = useProject();
  const [step, setStep] = useState(STEPS.IMAGE);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const projectModal = useProject();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    watch,
    setValue,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      image: "",
      projectTitle: "",
      projectDescription: "",
      projectLink: "",
      liveProjectLink: "",
      gptDesc: "",
    },
  });
  const imageUrl = watch("image");

  const setCustomValue = useCallback(
    (id: string, value: string) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

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
      <ImageUpload
        value={imageUrl}
        onChange={(value: string) => setCustomValue("image", value)}
      />
    </div>
  );
  const handleGptRes = async () => {
    const gptValue = getValues("gptDesc");
    if (!gptValue) {
      return toast.error("Give prompt to generate description");
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/generate", {
        text: gptValue,
      });
      setValue("projectDescription", data.message);
      resetField("gptDesc");
      toast.success("Voila! Description generated");
    } catch (error) {
      toast.error("Please try again!");
    } finally {
      setIsLoading(false);
    }
  };
  if (step === STEPS.INFO) {
    body = (
      <div className="flex flex-col p-3 mt-6 space-y-7">
        <Heading
          heading="About Project"
          subHeading="Fill in the project title and give description about the project"
        />
        <Input
          required
          label="Title"
          id="projectTitle"
          type="text"
          placeholder="Project Title"
          register={register}
          errors={errors}
        />
        <hr />
        <Input
          required
          label="Description"
          id="projectDescription"
          type="text"
          placeholder="Project Description"
          register={register}
          errors={errors}
        />
        <hr />
        <div className="relative">
          <Input
            label="Generate Description"
            id="gptDesc"
            type="text"
            placeholder="Generate Description"
            register={register}
            errors={errors}
          />
          <button
            title="Search"
            type="submit"
            onClick={handleGptRes}
            disabled={isLoading}
            className={`absolute  top-4 rounded-md  right-2 bg-green-500  py-2 px-3 text-white  hover:bg-green-600 transition group disabled:bg-green-400 disabled:cursor-not-allowed`}
          >
            <AiOutlineSend
              className="group-hover:-rotate-45 transition"
              size={16}
            />
          </button>
        </div>
      </div>
    );
  }

  if (step === STEPS.LINKS) {
    body = (
      <div className="flex flex-col space-y-7 p-3 mt-6">
        <Heading
          heading="Project Resources and Links"
          subHeading="Access the Source Code and Live Site URLs"
        />
        <Input
          errors={errors}
          id="projectLink"
          label="Link"
          register={register}
          placeholder="Link"
          required
          type="text"
          key="projectLink"
        />
        <hr />
        <Input
          errors={errors}
          id="liveProjectLink"
          label="Live Url"
          register={register}
          placeholder="Live Url"
          type="text"
          key={"liveProjectLink"}
        />
      </div>
    );
  }

  const onSubmit = handleSubmit(
    useCallback(
      async (values: any) => {
        if (step !== STEPS.LINKS) {
          return onNext();
        }

        try {
          setIsLoading(true);
          const { data } = await axios.post("/api/project", {
            image: values.image,
            projectTitle: values.projectTitle,
            projectDescription: values.projectDescription,
            projectLink: values.projectLink,
            liveProjectLink: values.liveProjectLink,
          });
          toast.success(data.message);
          projectModal.onClose();
          reset();
          router.refresh();
          router.push("/");
        } catch (error) {
          toast.error("Something went wrong");
        } finally {
          setIsLoading(false);
        }
      },
      [onNext, projectModal, reset, router, step]
    )
  );

  return (
    <Modal
      title="Add Project"
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      body={body}
      primaryActionLabel={primaryLabel}
      secondaryActionLabel={secondaryLabel}
      onSubmit={onSubmit}
      disabled={step === STEPS.LINKS ? isLoading : false}
      secondaryAction={onPrev}
    />
  );
};

export default AddProjectModal;
