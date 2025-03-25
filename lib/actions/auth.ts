"use server"

import { z } from "zod"
import { createUser, findUserByEmail } from "../models/user"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"
import { loginSchema, signupSchema } from "../schemas/schema"


// Type for form state
export type FormState = {
  errors?: {
    firstName?: string[]
    lastName?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
    _form?: string[]
  }
  message?: string
  success?: boolean
}

// Signup action
export async function signup(prevState: FormState, formData: FormData): Promise<FormState> {
  console.log("Signup action called with FormData:", Object.fromEntries(formData.entries()));

  // Extract values safely
  const firstName = formData.get("firstName")?.toString() || "";
  const lastName = formData.get("lastName")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const confirmPassword = formData.get("confirmPassword")?.toString() || "";


  console.log("Signup action called with FormData:", { firstName, lastName, email, password, confirmPassword });
  
  // Validate form data
  const validatedFields = signupSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  // Return errors if validation fails
  console.log("Validated fields:", validatedFields.success, validatedFields.error);
  
  if (!validatedFields.success) {
    console.log("Validation failed:", validatedFields.error.flatten());
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid form data. Please check the fields.",
      success: false,
    };
  }

  try {
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    console.log("Existing user:", existingUser);
    
    if (existingUser) {
      return {
        errors: { email: ["User with this email already exists"] },
        message: "User with this email already exists",
        success: false,
      };
    }

    // Create user
    await createUser({ firstName, lastName, email, password });

    console.log('User created successfully');
    

    return {
      message: "Account created successfully! You can now log in.",
      success: true,
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      errors: { _form: ["An error occurred during signup. Please try again."] },
      message: "An error occurred during signup. Please try again.",
      success: false,
    };
  }
}

// Login action
export async function login(prevState: FormState, formData: FormData): Promise<FormState> {
  console.log("Login action called:", formData);

  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid form data. Please check the fields.",
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  // ✅ Here, you should authenticate user from your database
  // Example: Check if user exists and password matches
  const user = await findUserByEmail(email); // Implement this function

  if (!user || user.password !== password) {
    return {
      errors: { _form: ["Invalid email or password"] },
      message: "Invalid email or password",
      success: false,
    };
  }

  return {
    message: "Login successful!",
    success: true,
  };
}

// Logout action
export async function logout() {
  await signIn("logout")
  redirect("/")
}

