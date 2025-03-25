"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useFormState } from "react-use-form-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { signup } from "@/lib/actions/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, formAction] = useFormState(signup);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // console.log("Form data: ", formData); // Debugging
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

  
    if (step === 1) {
      console.log("Step 1 form data: ", formData);
      setStep(2);
      return;
    }
  
    setIsLoading(true);
  
    const formDataToBeSent = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      console.log(`Appending ${key}: ${value}`); // Debugging
      formDataToBeSent.append(key, value);
    });
    
    // Debugging: Check if formDataToBeSent is populated
    console.log("Submit data before sending:", Object.fromEntries(formDataToBeSent.entries()));
    
    
  
    try {
      const result = await signup(formState, formDataToBeSent);
      console.log("Signup result: ", result);
    
      setIsLoading(false);
    
      if (result?.success) {
        setSuccessMsg("Account created successfully! Redirecting to login page...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        // Extract the first error message dynamically
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
      setIsLoading(false);
    }
    
  };

  console.log(successMsg);
  
  console.log(errorMsg);
  
  
  

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

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the <Link href="#" className="text-primary hover:underline">Terms</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                  </Label>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              {step === 2 && <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>}
              <Button type="submit" className="flex-1" disabled={isLoading}>{step === 1 ? "Continue" : isLoading ? "Creating Account..." : "Create Account"}</Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
