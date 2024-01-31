"use client";

import AuthFormWrapper from "@/components/features/auth/authFormWrapper";
import DynamicForm from "@/components/form/dynamicForm";
import { Button } from "flowbite-react";
import { ArrowRightCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import useUserApi from "@/hooks/useUsersApi";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import { useSearchParams } from "next/navigation";

const SignIn = () => {
  const { setQuery } = useGlobalFucntions();
  const { forgotPasswordMutation } = useUserApi();
  const { mutate, isSuccess } = forgotPasswordMutation;

  const { get } = useSearchParams();
  const email = get("verification") || "";

  const handleForgot = async (values: forgotType) => {
    setQuery("verification", email);
    mutate(values.email);
  };

  const handleResend = async () => {};

  const handleGoToEmail = () => {
    window.open(`https://mailto:${email}`, "_blank");
  };

  const emailSnip = email ? email.slice(0, 4) + "......." + email.slice(email.indexOf("@")) : "";

  const description = get("verification")
    ? `A password reset link has been sent to your email address ${emailSnip}`
    : "No worries, recovery is seamless 😋";

  return (
    <AuthFormWrapper title="Forgotten password" description={description} hideSocials>
      {!isSuccess ? (
        <>
          <DynamicForm
            formInfo={formInfo}
            defaultValues={defaultValues}
            formSchema={forgotSchema}
            onFormSubmit={handleForgot}
          >
            <Button type="submit" color="secondary">
              <span>Forgot password</span> <ArrowRightCircle className="ml-1" />
            </Button>
          </DynamicForm>
          <div className="mt-10">
            <span className="sb-text-18 text-foreground-3">Oh, I have remembered my password!</span>{" "}
            <Button
              color="ghost2"
              size="fit"
              className="text-primary sb-text-18 font-semibold"
              href="/auth/signin"
            >
              Sign in
            </Button>
          </div>
        </>
      ) : (
        <>
          <Button type="submit" color="secondary" onClick={handleGoToEmail}>
            <span>Go to email</span> <ArrowRightCircle className="ml-1" />
          </Button>
          <div className="mt-11">
            <span className="sb-text-18 text-foreground-3">Did not recieve link?</span>{" "}
            <Button
              color="ghost2"
              size="fit"
              className="text-primary sb-text-18 font-semibold"
              onClick={handleResend}
            >
              Resend
            </Button>
          </div>
          <div className="mt-10">
            <span className="sb-text-18 text-foreground-3">Oh, I have remembered my password!</span>{" "}
            <Button
              color="ghost2"
              size="fit"
              className="text-primary sb-text-18 font-semibold"
              href="/auth/signup"
            >
              Sign in
            </Button>
          </div>
        </>
      )}
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
];

const forgotSchema = z.object({
  email: z.string().email("Enter a valid email").min(1, { message: "Enter your email address" }),
});

type forgotType = z.infer<typeof forgotSchema>;

const defaultValues = {
  email: "",
};
