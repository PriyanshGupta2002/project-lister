"use client";
import React from "react";
import Input from "./Input";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<FieldValues>({
    defaultValues: {
      search: "",
    },
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    resetField("search");
  });
  return (
    <div className="max-w-7xl m-auto mb-4 relative">
      <Input
        errors={errors}
        id="search"
        label="Search For Project"
        register={register}
        placeholder="Name"
        required={true}
        type="text"
      />
      <button
        title="Search"
        type="submit"
        onClick={onSubmit}
        className="absolute  top-4 rounded-md  right-2 bg-rose-500  py-2 px-3 text-white  hover:bg-red-600 transition group"
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
