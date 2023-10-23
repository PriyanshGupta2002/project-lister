"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface imageUploadProps {
  value: string;
  onChange: (value: string) => void;
}
const ImageUpload: React.FC<imageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      if (result) {
        onChange(result.info.secure_url);
      }
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      uploadPreset="ek8rbi2y"
      onUpload={handleUpload}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open, isLoading }) => {
        console.log(isLoading);
        return (
          <div
            onClick={() => open?.()}
            className="p-20 border-2 relative border-dashed flex items-center justify-center"
          >
            <div className="flex flex-col items-center cursor-pointer gap-3">
              <span className="text-xl text-gray-400">Click To Upload</span>
              <TbPhotoPlus size={50} className="text-slate-500" />
            </div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image alt="image" src={value} fill className="object-cover" />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
