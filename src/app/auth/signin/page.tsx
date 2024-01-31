"use client";

import AuthFormWrapper from "@/components/features/auth/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import React from "react";
import * as z from "zod";
import { signIn, useSession } from "next-auth/react";

const SignIn = () => {
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

  const handleSignInWithGoogle = async () => {
    const response = await signIn("google");
    console.log(response);
  };

  const handleSignInWithYahoo = async () => {
    const response = await signIn("yahoo");
    console.log(response);
  };
  return (
    <AuthFormWrapper
      login
      handlers={{
        google: handleSignInWithGoogle,
        yahoo: handleSignInWithYahoo,
      }}
    >
      <DynamicForm
        formInfo={formInfo}
        defaultValues={defaultValues}
        formSchema={signInSchema}
        onFormSubmit={handleSignIn}
      >
        <div className="flex items-center gap-10">
          <div className="flex items-center flex-wrap gap-1">
            <p className="sb-text-16 text-foreground-3">Don&#39;t have an account? </p>
            <Button color="ghost2" size="fit" className="text-secondary" href="/auth/signup">
              Sign up
            </Button>
          </div>
          <Button type="submit" color="secondary">
            <span>Continue to Sign in</span> <ArrowRightCircle className="ml-1" />
          </Button>
        </div>
      </DynamicForm>
    </AuthFormWrapper>
  );
};

export default SignIn;

const formInfo = [
  {
    name: "email",
    label: "Enter Email Address",
    type: "email",
    textInputProp: {
      placeholder: "Enter your email address",
    },
  },
  {
    name: "password",
    label: "Enter Password",
    type: "password",
    textInputProp: {
      placeholder: "Enter your password",
    },
  },
];

const signInSchema = z.object({
  email: z.string().email("Enter a valid email").min(1, { message: "Enter your email address" }),
  password: z.string().min(6, "Password must be 6 or more characters"),
});

const defaultValues = {
  email: "",
  password: "",
};
