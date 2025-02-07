"use client";

import AuthFormWrapper from "@/components/features/auth/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import React, { useEffect } from "react";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { Oval } from "react-loading-icons";
import { IDynamicFormField } from "@/components/form/dynamicForm/constants";
import { useResetPasswordMutation } from "@/services/users";

const ResetPassword = () => {
  const { mutate, isPending, isSuccess } = useResetPasswordMutation();

  const { token } = useParams();
  const { push } = useRouter();

  const handleReset = async (values: resetPasswordType) => {
    console.log({ token: token as string, password: values.password });
    mutate({ token: token as string, password: values.password });
  };

  useEffect(() => {
    if (isSuccess) push("/auth/signin");
  }, [isSuccess]);

  return (
    <AuthFormWrapper
      title="Reset password"
      description="Kindly use password combination  you can easily remember."
      hideSocials
    >
      <DynamicForm
        formInfo={formInfo}
        defaultValues={defaultValues}
        formSchema={resetPasswordSchema}
        onFormSubmit={handleReset}
      >
        <Button
          type="submit"
          color="secondary"
          isProcessing={isPending}
          disabled={isPending}
          processingSpinner={<Oval color="white" strokeWidth={4} className="h-6 w-6" />}
        >
          <span>Reset Password</span> {!isPending && <ArrowRightCircle className="ml-1" />}
        </Button>
      </DynamicForm>
    </AuthFormWrapper>
  );
};

export default ResetPassword;

const formInfo: IDynamicFormField[] = [
  {
    name: "password",
    label: "Enter Password",
    type: "password",
    textInputProp: {
      placeholder: "Enter your new password",
    },
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    textInputProp: {
      placeholder: "Confirm your new password",
    },
  },
];

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be 6 or more characters"),
    confirmPassword: z
      .string({ required_error: "Confirm password" })
      .min(1, { message: "Confirm password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type resetPasswordType = z.infer<typeof resetPasswordSchema>;

const defaultValues = {
  password: "",
  confirmPassword: "",
};
