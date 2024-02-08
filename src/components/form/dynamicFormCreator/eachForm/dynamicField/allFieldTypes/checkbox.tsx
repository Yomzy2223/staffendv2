import { Checkbox, TextInput } from "flowbite-react";
import { X } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

const CheckboxOption = ({
  options,
  setValue,
}: {
  options: string[];
  setValue: UseFormSetValue<{ [x: string]: any }>;
}) => {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    if (options) setList(options);
  }, [options]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const value = e.target.value;
    let listCopy = [...list];
    listCopy.splice(i, 1, value);
    setList(listCopy);
  };

  return (
    <div>
      {options.map((option, i) => (
        <div className="flex">
          <Checkbox disabled />
          <div className="flex justify-between">
            <TextInput value={option} onChange={(e) => handleChange(e, i)} />
            <X />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckboxOption;
