"use client";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";
import { AiOutlineUpload } from "react-icons/ai";

const ImageUpload = () => {
  return (
    <CldUploadWidget uploadPreset="ek8rbi2y">
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="p-20 border-2 border-dashed flex items-center justify-center"
          >
            <div className="flex flex-col items-center cursor-pointer gap-3">
              <span className="text-xl text-gray-400">Upload</span>
              <AiOutlineUpload size={25} className="text-slate-500" />
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
