"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Login } from "@/action/authaction";
import { Button } from "@/components/ui/button";

const formData = [
  {
    name: "email",
    type: "email",
    placeHolder: "admin@eagleway.com",
    label: "Admin Email",
  },
  {
    name: "password",
    type: "password",
    placeHolder: "********",
    label: "Admin Password",
  },
];

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must not exceed 32 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export default function AdminLoginPage() {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmitForm = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const response = await Login(data.email, data.password, "admin");
    setIsSubmitting(false);
    if (response.success) {
      toast.success(response.message);
      router.push("/main");
    } else {
      toast.error(response.message);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => setIsPageLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isPageLoading ? (
        <h2 className="text-center mt-32 text-blue-700 text-xl font-semibold">Loading admin panel...</h2>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-blue-700">
          <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-md border-t-8 border-blue-700">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center shadow-lg mb-2">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                  <path d="M12 2L3.09 8.26L4 9L12 4L20 9L20.91 8.26L12 2ZM12 6L6.5 9.5L12 13L17.5 9.5L12 6ZM6 10.5L12 14L18 10.5V16.5L12 20L6 16.5V10.5Z" />
                </svg>
              </div>
              <h1 className="text-2xl font-extrabold text-blue-800 tracking-wide">Admin Portal</h1>
              <p className="text-gray-500 text-sm mt-1">Sign in to manage Eagleway Property</p>
            </div>
            <Form {...form}>
              <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmitForm)}>
                <div>
                  {formData.map((formField, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={formField.name as "password" | "email"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs block text-gray-700 mb-1 font-semibold tracking-wider">
                            {formField.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                              id={formField.name}
                              type={formField.type}
                              placeholder={formField.placeHolder}
                              autoComplete={formField.name}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <a href="#" className="text-blue-600 text-xs hover:underline">
                    Forgot password?
                  </a>
                  <span className="text-gray-400 text-xs">Admin access only</span>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2 rounded font-bold hover:bg-blue-800 transition text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
