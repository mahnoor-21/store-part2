"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { signup } from "@/lib/actions/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({ mode: "onTouched" });

  const onSubmit = async (data: FormData) => {
    setErrorMsg("");
    setSuccessMsg("");

    if (step === 1) {
      setStep(2);
      return;
    }

    setIsLoading(true);

    const formDataToSend = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "terms") formDataToSend.append(key, value as string);
    });

    try {
      const result = await signup(formDataToSend);
      setIsLoading(false);

      if (result?.success) {
        setSuccessMsg("Account created successfully! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        const errorMsg =
          result?.errors?.firstName?.[0] ||
          result?.errors?.lastName?.[0] ||
          result?.errors?.email?.[0] ||
          result?.errors?.password?.[0] ||
          result?.errors?.confirmPassword?.[0] ||
          result?.errors?._form?.[0] ||
          "Signup failed";

        setErrorMsg(errorMsg);
      }
    } catch (error) {
      console.error("Signup failed", error);
      setErrorMsg("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-4xl gap-8 rounded-lg border bg-card p-4 shadow-lg md:grid-cols-2 md:p-8">
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Create an Account</h1>
          <p className="text-muted-foreground">Join our community of book lovers</p>

          {errorMsg && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}

          {successMsg && (
            <Alert variant="success" className="mb-4">
              <AlertDescription>{successMsg}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 ? (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...register("firstName", { required: "First name is required" })}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...register("lastName", { required: "Last name is required" })}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                      validate: (value) =>
                        value === getValues("password") || "Passwords do not match",
                    })}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" {...register("terms", { required: true })} />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="#" className="text-primary hover:underline">Terms</Link> and{" "}
                    <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                  </Label>
                </div>
                {errors.terms && (
                  <p className="text-sm text-red-500">You must agree to the terms</p>
                )}
              </div>
            )}
            <div className="flex gap-2">
              {step === 2 && (
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
              )}
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {step === 1 ? "Continue" : isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
