import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Checkbox, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import QuestionHeader from "./header";
import * as z from "zod";
import { Delete, Edit } from "lucide-react";

interface propType {
  type: string;
  number: number;
  title?: string;
  submitHandler: (values: formType) => void;
}

const Question = ({ type, number, title, submitHandler }: propType) => {
  const [edit, setEdit] = useState(false);

  // Form definition
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Submit handler
  function onSubmit(values: formType) {
    submitHandler && submitHandler(values);
  }
  const errorMsg = errors["question"]?.message;

  return (
    <Card>
      <QuestionHeader title={title} number={number} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <TextInput
          id="question"
          type="text"
          sizing="md"
          helperText={<>{errorMsg}</>}
          color={errors["question"] && "failure"}
          className={errorMsg ? "focus:[&_input]:outline-none" : ""}
          disabled={!edit}
          {...register("question")}
        />

        {/* Footer */}
        <div className="flex justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Checkbox id="compulsory" />
            <label htmlFor="compulsory">Compulsory</label>
          </div>
          {edit ? (
            <Button type="submit">Done</Button>
          ) : (
            <div>
              <Edit
                size={16}
                color="hsl(var(--foreground-5))"
                onClick={() => setEdit(true)}
              />
              <Delete size={16} color="hsl(var(--foreground-5))" />
            </div>
          )}
        </div>
      </form>
    </Card>
  );
};

export default Question;

const formSchema = z.object({
  question: z.string().min(3, { message: "Must be at least 3 characters" }),
});
type formType = z.infer<typeof formSchema>;

const defaultValues = {};
