"use client";
import React from "react";
import Select, { GroupBase } from "react-select";

interface FilterProps {
  value: string;
  onChange: (value: string) => void;
}

type OptionType = { value: string; label: string };

const Filter: React.FC<FilterProps> = ({ value, onChange }) => {
  const options: OptionType[] = [
    {
      value: "asc",
      label: "Oldest",
    },
    {
      value: "desc",
      label: "Newest",
    },
  ];

  // Wrap the options in a GroupBase
  const groupedOptions: GroupBase<OptionType>[] = [
    { label: "Options", options },
  ];
  return (
    <Select
      // defaultValue={options[0]} // Set a default value

      options={groupedOptions}
      placeholder="Filter"
      className="p-3"
      formatOptionLabel={(option: OptionType) => {
        return (
          <div className="text-neutral-400 font-medium cursor-pointer">
            {option.label}
          </div>
        );
      }}
      classNames={{
        control: () => "p-2 px-5 border-2",
        input: () => "text-lg text-black",
        option: () => "text-lg",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 4,
        colors: {
          ...theme.colors,
          primary25: "rgb(100 116 139 / 0.4)",
          primary: "black",
        },
      })}
      onChange={(selectedOption) =>
        selectedOption && onChange(selectedOption.value)
      }
    />
  );
};

export default Filter;
