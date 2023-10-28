"use client";
import React, { useCallback, useMemo } from "react";
import Input from "./Input";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      search: "",
    },
  });
  const pathName = usePathname();
  const router = useRouter();
  const onSubmit = handleSubmit(
    useCallback(
      (data) => {
        router.push(`${pathName}?search=${data.search}`);
        reset();
      },
      [router, pathName, reset]
    )
  );

  const showPathName = useMemo(() => {
    return pathName.includes("/project");
  }, [pathName]);
  return (
    <div
      className={`max-w-7xl m-auto mb-4 relative p-5 ${
        showPathName ? "hidden" : ""
      }`}
    >
      <Input
        errors={errors}
        id="search"
        label="Search For Project"
        register={register}
        placeholder="Name"
        required={true}
        type="text"
        actionOnEnterKey={onSubmit}
      />
      <button
        title="Search"
        type="button"
        onClick={onSubmit}
        className="absolute  top-[34%] -translate-x-1/2 rounded-md  right-2 bg-rose-500  py-2 px-3 text-white  hover:bg-red-600 transition group"
      >
        <AiOutlineSend
          className="group-hover:-rotate-45 transition"
          size={16}
        />
      </button>
    </div>
  );
};

export default Search;
