"use client";

import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/inputField";
import { Button } from "@/components/ui/button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="form-title">Log In To Your Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <InputField
          name="email"
          label="Email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address",
          }}
        />

        {/* Password */}
        <InputField
          name="password"
          label="Password"
          placeholder="Enter your password"
          register={register}
          error={errors.email}
          validation={{
            required: "Password is required",
            minLength: 8,
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn mt-5 w-full"
        >
          {isSubmitting ? "Logging In" : "Log In"}
        </Button>

        <FooterLink
          text="Don't have an account?"
          linkText="Sign Up"
          href="/sign-up"
        />
      </form>
    </>
  );
};

export default SignIn;
