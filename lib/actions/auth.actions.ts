"use server";

import { success } from "better-auth";
// import { email, success } from "better-auth";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";
import { headers } from "next/headers";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: { email, password, name: fullName },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }
    return { success: true, data: response };
  } catch (err) {
    const message =
      err instanceof Error
        ? `Sign up failed: ${err.message}`
        : "Sign up failed";
    console.error(message);
    return { success: false, error: message };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sign out failed";
    console.error(message);
    return { success: false, error: message };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({ body: { email, password } });

    if (!response) return;

    return { success: true, data: response };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sign in failed";
    console.log(message);
    return { success: false, error: message };
  }
};
