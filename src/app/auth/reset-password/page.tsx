"use client";

import AuthFormWrapper from "@/components/features/auth/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import React from "react";
import * as z from "zod";
import { signIn, useSession } from "next-auth/react";

const ResetPassword = () => {
  const session = useSession();
  // console.log(session);

  const handleSignIn = async (values: any) => {
    const response = await signIn("signIn", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    console.log(response);
  };

  return (
    <AuthFormWrapper
      title="Reset password"
      description="Kindly use password combination  you can easily remember."
      hideSocials
    >
      <DynamicForm
        formInfo={formInfo}
        defaultValues={defaultValues}
        formSchema={signInSchema}
        onFormSubmit={handleSignIn}
      >
        <Button type="submit" color="secondary">
          <span>Reset Password</span> <ArrowRightCircle className="ml-1" />
        </Button>
      </DynamicForm>
    </AuthFormWrapper>
  );
};

export default ResetPassword;

const formInfo = [
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

const signInSchema = z
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

const defaultValues = {
  email: "",
  password: "",
};
