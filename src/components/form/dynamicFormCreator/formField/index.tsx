import { Button, Card } from "flowbite-react";
import React, { useState } from "react";
import Header from "./header";
import * as z from "zod";
import Footer from "./footer";
import { FieldType } from "./constants";
import DynamicField from "./dynamicField";
import { PlusCircle } from "lucide-react";
import FieldTypePopUp from "./fieldTypePopUp";

const FormField = ({ info, number, title, submitHandler, isEdit }: propType) => {
  const [selectedType, setSelectedType] = useState<FieldType | undefined>({
    ...info,
  });
  const [edit, setEdit] = useState(isEdit || false);
  const [checked, setChecked] = useState(info.compulsory as boolean);
  const [newlyAdded, setNewlyAdded] = useState<FieldType | undefined>();

  const btnText = info?.options
    ? (info?.options.length > 0 ? "Add another " : "Create a ") + (title || "field")
    : "";

  const handleSelect = (type?: FieldType) => {
    if (!type) return;
    setNewlyAdded(type);
  };

  const handleSubmit = async (values: formFieldType) => {
    await submitHandler(values);
    setNewlyAdded(undefined);
  };

  if (info.type === "person")
    return (
      <Card className="shadow-none [&>div]:p-4 max-w-[500px] h-max">
        <Header
          title={title}
          number={number}
          edit={edit}
          checked={checked}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        {info.options?.map((field, i) => (
          <DynamicField
            key={field.title}
            number={i + 1}
            info={field}
            title={title}
            submitHandler={submitHandler}
            isEdit={edit}
            isPerson
          />
        ))}
        {newlyAdded && (
          <DynamicField
            number={info.options?.length ?? 0 + 1}
            info={newlyAdded}
            title={title}
            submitHandler={handleSubmit}
            isEdit={edit}
            isPerson
          />
        )}
        <Footer
          checked={checked}
          edit={edit}
          setEdit={setEdit}
          setChecked={setChecked}
          onDoneClick={() => setEdit(false)}
        >
          {edit && (
            <FieldTypePopUp handleSelect={handleSelect}>
              <Button color="ghost" size="fit" className="text-foreground-5">
                <PlusCircle size={20} />
                {btnText}
              </Button>
            </FieldTypePopUp>
          )}
        </Footer>
      </Card>
    );

  return (
    <DynamicField
      key={info.title}
      number={number}
      info={info}
      submitHandler={submitHandler}
      title={title}
      isEdit={edit}
    />
  );
};

export default FormField;

interface propType {
  info: FieldType;
  number: number;
  title?: string;
  submitHandler: (values: formFieldType) => void;
  isEdit?: boolean;
}

const formSchema = z.object({
  title: z
    .string({ required_error: "Enter field / field title" })
    .min(3, { message: "Must be at least 3 characters" }),
  type: z.string({ required_error: "Select type" }).min(1, { message: "Select type" }),
  compulsory: z.boolean(),
});
export type formFieldType = z.infer<typeof formSchema>;
